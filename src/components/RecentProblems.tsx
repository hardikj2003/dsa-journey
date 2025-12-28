import { Bookmark, Clock, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import type { Database } from '@/integrations/supabase/types';

type Problem = Database['public']['Tables']['problems']['Row'];

interface RecentProblemsProps {
  limit?: number;
}

const platformColors: Record<string, string> = {
  LeetCode: 'bg-orange-500/20 text-orange-600 dark:text-orange-400',
  GeeksforGeeks: 'bg-green-500/20 text-green-600 dark:text-green-400',
  Codeforces: 'bg-blue-500/20 text-blue-600 dark:text-blue-400',
  HackerRank: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
  CodeChef: 'bg-amber-500/20 text-amber-600 dark:text-amber-400',
  Other: 'bg-gray-500/20 text-gray-600 dark:text-gray-400'
};

export function RecentProblems({ limit = 5 }: RecentProblemsProps) {
  const { getRecentProblems, toggleBookmark, deleteProblem } = useSupabaseData();
  
  const problems = getRecentProblems(limit);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateStr === today.toISOString().split('T')[0]) {
      return 'Today';
    }
    if (dateStr === yesterday.toISOString().split('T')[0]) {
      return 'Yesterday';
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getDifficultyVariant = (difficulty: string): "easy" | "medium" | "hard" => {
    return difficulty.toLowerCase() as "easy" | "medium" | "hard";
  };

  if (problems.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Problems</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>No problems logged yet.</p>
            <p className="text-sm mt-1">Start tracking your DSA journey!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Problems</CardTitle>
        <Badge variant="outline" className="font-mono">
          {problems.length} / {limit}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {problems.map((problem: Problem) => (
          <div
            key={problem.id}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-medium truncate">{problem.name}</h4>
                <Badge variant={getDifficultyVariant(problem.difficulty)}>
                  {problem.difficulty}
                </Badge>
              </div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded-full ${platformColors[problem.platform]}`}>
                  {problem.platform}
                </span>
                <Badge variant="topic" className="text-xs">
                  {problem.topic}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {problem.time_spent}min
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(problem.date)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => toggleBookmark(problem.id)}
              >
                <Bookmark
                  className={`h-4 w-4 ${problem.is_bookmarked ? 'fill-primary text-primary' : ''}`}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => deleteProblem(problem.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
