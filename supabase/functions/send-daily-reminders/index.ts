import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface UserProfile {
  user_id: string;
  display_name: string | null;
  reminder_enabled: boolean;
  reminder_time: string;
  timezone: string;
}

interface UserWithEmail extends UserProfile {
  email: string;
}

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "DSA Tracker <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to send email: ${error}`);
  }

  return res.json();
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-daily-reminders function invoked");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get current hour in UTC
    const now = new Date();
    const currentHourUTC = now.getUTCHours();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString().split('T')[0];

    console.log(`Current UTC hour: ${currentHourUTC}, Today: ${todayStart}`);

    // Get all profiles with reminders enabled
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("user_id, display_name, reminder_enabled, reminder_time, timezone")
      .eq("reminder_enabled", true);

    if (profilesError) {
      console.error("Error fetching profiles:", profilesError);
      throw profilesError;
    }

    console.log(`Found ${profiles?.length || 0} profiles with reminders enabled`);

    if (!profiles || profiles.length === 0) {
      return new Response(JSON.stringify({ message: "No users with reminders enabled" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const usersToNotify: UserWithEmail[] = [];

    for (const profile of profiles as UserProfile[]) {
      // Parse reminder time (format: "HH:MM:SS")
      const [reminderHour] = profile.reminder_time.split(":").map(Number);
      
      // Simple timezone offset calculation
      const timezoneOffset = getTimezoneOffset(profile.timezone);
      const userCurrentHour = (currentHourUTC + timezoneOffset + 24) % 24;

      console.log(`User ${profile.user_id}: reminder_time=${reminderHour}, userCurrentHour=${userCurrentHour}, timezone=${profile.timezone}`);

      // Check if it's the right hour for this user
      if (userCurrentHour !== reminderHour) {
        continue;
      }

      // Check if user has logged any problems today
      const { data: todaysProblems, error: problemsError } = await supabase
        .from("problems")
        .select("id")
        .eq("user_id", profile.user_id)
        .gte("date", todayStart)
        .limit(1);

      if (problemsError) {
        console.error(`Error checking problems for user ${profile.user_id}:`, problemsError);
        continue;
      }

      // If no problems logged today, add to notification list
      if (!todaysProblems || todaysProblems.length === 0) {
        // Get user email from auth
        const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(profile.user_id);
        
        if (authError || !authUser?.user?.email) {
          console.error(`Error getting email for user ${profile.user_id}:`, authError);
          continue;
        }

        usersToNotify.push({
          ...profile,
          email: authUser.user.email,
        });
      }
    }

    console.log(`Sending reminders to ${usersToNotify.length} users`);

    const results = [];
    for (const user of usersToNotify) {
      try {
        const emailResponse = await sendEmail(
          user.email,
          "🔥 Don't break your streak! Log your DSA practice today",
          generateReminderEmail(user.display_name || "Developer")
        );

        console.log(`Email sent to ${user.email}:`, emailResponse);

        // Create in-app notification
        await supabase.from("notifications").insert({
          user_id: user.user_id,
          title: "Daily Reminder",
          message: "You haven't logged any DSA practice today. Keep your streak alive!",
          is_read: false,
        });

        results.push({ email: user.email, status: "sent" });
      } catch (emailError) {
        console.error(`Failed to send email to ${user.email}:`, emailError);
        results.push({ email: user.email, status: "failed", error: String(emailError) });
      }
    }

    return new Response(JSON.stringify({ 
      message: `Processed ${usersToNotify.length} reminders`,
      results 
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in send-daily-reminders:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

function getTimezoneOffset(timezone: string): number {
  const offsets: Record<string, number> = {
    "UTC": 0,
    "America/New_York": -5,
    "America/Chicago": -6,
    "America/Denver": -7,
    "America/Los_Angeles": -8,
    "America/Anchorage": -9,
    "Pacific/Honolulu": -10,
    "Europe/London": 0,
    "Europe/Paris": 1,
    "Europe/Berlin": 1,
    "Europe/Moscow": 3,
    "Asia/Dubai": 4,
    "Asia/Kolkata": 5.5,
    "Asia/Singapore": 8,
    "Asia/Tokyo": 9,
    "Asia/Shanghai": 8,
    "Australia/Sydney": 11,
    "Pacific/Auckland": 13,
  };
  return offsets[timezone] || 0;
}

function generateReminderEmail(name: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%); border: 1px solid #22c55e33; border-radius: 16px; padding: 40px; text-align: center;">
      <div style="font-size: 48px; margin-bottom: 20px;">🔥</div>
      <h1 style="color: #22c55e; font-size: 24px; margin: 0 0 16px 0;">Hey ${name}!</h1>
      <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
        You haven't logged any DSA practice today. Don't let your streak slip away!
      </p>
      <p style="color: #71717a; font-size: 14px; margin: 0 0 32px 0;">
        Even solving one easy problem keeps the momentum going. 💪
      </p>
      <div style="display: inline-block; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #000; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
        Log Your Practice Now
      </div>
      <p style="color: #52525b; font-size: 12px; margin: 32px 0 0 0;">
        You can adjust your reminder settings in the app.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

serve(handler);
