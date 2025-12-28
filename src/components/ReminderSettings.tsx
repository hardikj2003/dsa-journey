import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Bell, Clock, Globe, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const TIMEZONES = [
  { value: "UTC", label: "UTC (GMT+0)" },
  { value: "America/New_York", label: "Eastern Time (GMT-5)" },
  { value: "America/Chicago", label: "Central Time (GMT-6)" },
  { value: "America/Denver", label: "Mountain Time (GMT-7)" },
  { value: "America/Los_Angeles", label: "Pacific Time (GMT-8)" },
  { value: "America/Anchorage", label: "Alaska Time (GMT-9)" },
  { value: "Pacific/Honolulu", label: "Hawaii Time (GMT-10)" },
  { value: "Europe/London", label: "London (GMT+0)" },
  { value: "Europe/Paris", label: "Paris (GMT+1)" },
  { value: "Europe/Berlin", label: "Berlin (GMT+1)" },
  { value: "Europe/Moscow", label: "Moscow (GMT+3)" },
  { value: "Asia/Dubai", label: "Dubai (GMT+4)" },
  { value: "Asia/Kolkata", label: "India (GMT+5:30)" },
  { value: "Asia/Singapore", label: "Singapore (GMT+8)" },
  { value: "Asia/Shanghai", label: "China (GMT+8)" },
  { value: "Asia/Tokyo", label: "Tokyo (GMT+9)" },
  { value: "Australia/Sydney", label: "Sydney (GMT+11)" },
  { value: "Pacific/Auckland", label: "Auckland (GMT+13)" },
];

const REMINDER_TIMES = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  const period = i < 12 ? "AM" : "PM";
  const displayHour = i === 0 ? 12 : i > 12 ? i - 12 : i;
  return {
    value: `${hour}:00:00`,
    label: `${displayHour}:00 ${period}`,
  };
});

export function ReminderSettings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState("09:00:00");
  const [timezone, setTimezone] = useState("UTC");

  useEffect(() => {
    if (user) {
      fetchSettings();
    }
  }, [user]);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("reminder_enabled, reminder_time, timezone")
        .eq("user_id", user?.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setReminderEnabled(data.reminder_enabled ?? true);
        setReminderTime(data.reminder_time ?? "09:00:00");
        setTimezone(data.timezone ?? "UTC");
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          reminder_enabled: reminderEnabled,
          reminder_time: reminderTime,
          timezone: timezone,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast.success("Reminder settings saved!");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card variant="glass">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/3"></div>
            <div className="h-10 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bell className="h-5 w-5 text-primary" />
          Email Reminders
        </CardTitle>
        <CardDescription>
          Get notified if you haven't logged any DSA practice for the day
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="reminder-toggle" className="text-sm font-medium">
              Daily Reminders
            </Label>
            <p className="text-xs text-muted-foreground">
              Receive an email if you haven't practiced
            </p>
          </div>
          <Switch
            id="reminder-toggle"
            checked={reminderEnabled}
            onCheckedChange={setReminderEnabled}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reminder-time" className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            Reminder Time
          </Label>
          <Select value={reminderTime} onValueChange={setReminderTime} disabled={!reminderEnabled}>
            <SelectTrigger id="reminder-time">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {REMINDER_TIMES.map((time) => (
                <SelectItem key={time.value} value={time.value}>
                  {time.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timezone" className="flex items-center gap-2 text-sm">
            <Globe className="h-4 w-4 text-muted-foreground" />
            Timezone
          </Label>
          <Select value={timezone} onValueChange={setTimezone} disabled={!reminderEnabled}>
            <SelectTrigger id="timezone">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              {TIMEZONES.map((tz) => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full" variant="gradient">
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </CardContent>
    </Card>
  );
}
