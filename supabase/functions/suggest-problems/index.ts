import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    // Fetch user's problems with topics and difficulties
    const { data: problems } = await supabase
      .from('problems')
      .select('topic, difficulty, name, tags, date')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .limit(50);

    // Fetch roadmap progress
    const { data: roadmapProgress } = await supabase
      .from('roadmap_progress')
      .select('topic_id, status, completed_problems')
      .eq('user_id', user.id);

    // Analyze patterns
    const topicCounts: Record<string, { total: number; difficulties: Record<string, number> }> = {};
    const recentTopics: string[] = [];

    (problems || []).forEach((problem, index) => {
      if (!topicCounts[problem.topic]) {
        topicCounts[problem.topic] = { total: 0, difficulties: { Easy: 0, Medium: 0, Hard: 0 } };
      }
      topicCounts[problem.topic].total++;
      topicCounts[problem.topic].difficulties[problem.difficulty]++;
      
      if (index < 10) {
        recentTopics.push(problem.topic);
      }
    });

    // Find weak topics (low count or only easy problems)
    const allTopics = ['Arrays', 'Strings', 'Hashing', 'Two Pointers', 'Sliding Window', 
      'Recursion', 'Binary Search', 'Stack', 'Queue', 'Linked List', 'Trees', 'Graphs', 
      'Dynamic Programming', 'Greedy', 'Backtracking', 'Bit Manipulation', 'Heaps', 'Tries'];
    
    const weakTopics = allTopics.filter(topic => {
      const stats = topicCounts[topic];
      if (!stats) return true; // Never practiced
      if (stats.total < 3) return true; // Low practice
      if (stats.difficulties.Medium === 0 && stats.difficulties.Hard === 0) return true; // Only easy
      return false;
    }).slice(0, 5);

    // Topics that are in progress on roadmap
    const inProgressTopics = (roadmapProgress || [])
      .filter(p => p.status === 'in_progress')
      .map(p => p.topic_id);

    // Build context for AI
    const context = {
      totalProblems: problems?.length || 0,
      weakTopics,
      recentTopics: [...new Set(recentTopics)],
      inProgressTopics,
      topicStats: Object.entries(topicCounts)
        .map(([topic, stats]) => `${topic}: ${stats.total} problems (E:${stats.difficulties.Easy}, M:${stats.difficulties.Medium}, H:${stats.difficulties.Hard})`)
        .join(', ')
    };

    console.log('Context for AI:', context);

    const systemPrompt = `You are a DSA (Data Structures and Algorithms) coach helping a developer practice for technical interviews.

Based on the user's practice history, suggest 3-5 specific problems they should solve today.

User's context:
- Total problems solved: ${context.totalProblems}
- Weak topics (need more practice): ${context.weakTopics.join(', ') || 'None identified'}
- Recent topics practiced: ${context.recentTopics.join(', ') || 'None yet'}
- Roadmap topics in progress: ${context.inProgressTopics.join(', ') || 'None'}
- Topic breakdown: ${context.topicStats || 'No problems solved yet'}

Guidelines:
1. Prioritize weak topics that haven't been practiced much
2. If user only does Easy problems, suggest Medium ones
3. Include a mix of difficulties (at least one Medium)
4. Suggest real LeetCode problems with actual problem numbers
5. Explain briefly why each problem is suggested

Return a JSON object with this structure:
{
  "suggestions": [
    {
      "name": "Two Sum",
      "number": 1,
      "topic": "Arrays",
      "difficulty": "Easy",
      "reason": "Foundational problem for hash map usage",
      "pattern": "Hash Map"
    }
  ],
  "dailyFocus": "Brief description of what to focus on today",
  "tip": "One actionable tip based on their progress"
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Please suggest problems for me to practice today based on my history." }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits in settings." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    let suggestions;
    try {
      suggestions = JSON.parse(content);
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI suggestions");
    }

    console.log("AI suggestions:", suggestions);

    return new Response(JSON.stringify(suggestions), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error in suggest-problems:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
