import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ExternalLink, RefreshCw, Lightbulb, Target, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ProblemSuggestion {
  name: string;
  number: number;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  reason: string;
  pattern: string;
}

interface AISuggestions {
  suggestions: ProblemSuggestion[];
  dailyFocus: string;
  tip: string;
}

export function AIProblemSuggestions() {
  const [suggestions, setSuggestions] = useState<AISuggestions | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('suggest-problems');
      
      if (error) {
        throw error;
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setSuggestions(data);
      setHasLoaded(true);
    } catch (error: any) {
      console.error('Error fetching suggestions:', error);
      toast({
        title: 'Failed to get suggestions',
        description: error.message || 'Please try again later',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success/20 text-success border-success/30';
      case 'Medium': return 'bg-warning/20 text-warning border-warning/30';
      case 'Hard': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const openLeetCode = (number: number) => {
    window.open(`https://leetcode.com/problems/`, '_blank');
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg gradient-primary">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">AI Problem Coach</CardTitle>
              <CardDescription>Personalized suggestions based on your progress</CardDescription>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchSuggestions}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-1" />
                {hasLoaded ? 'Refresh' : 'Get Suggestions'}
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!hasLoaded && !loading && (
          <div className="text-center py-8 text-muted-foreground">
            <Sparkles className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Click "Get Suggestions" for AI-powered problem recommendations</p>
            <p className="text-xs mt-1 opacity-70">Based on your weak topics, roadmap progress & practice history</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 mx-auto mb-3 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Analyzing your progress...</p>
          </div>
        )}

        {suggestions && !loading && (
          <>
            {/* Daily Focus */}
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-start gap-2">
                <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-primary">Today's Focus</p>
                  <p className="text-sm text-foreground/80">{suggestions.dailyFocus}</p>
                </div>
              </div>
            </div>

            {/* Problem Suggestions */}
            <div className="space-y-3">
              {suggestions.suggestions.map((problem, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm">
                          #{problem.number} {problem.name}
                        </span>
                        <Badge variant="outline" className={getDifficultyColor(problem.difficulty)}>
                          {problem.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {problem.topic}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Pattern: {problem.pattern}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {problem.reason}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => openLeetCode(problem.number)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Tip */}
            <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-accent">Pro Tip</p>
                  <p className="text-sm text-foreground/80">{suggestions.tip}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
