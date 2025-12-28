import { Header } from '@/components/Header';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { dsaRoadmap } from '@/data/roadmap';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, Clock, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const Roadmap = () => {
  const { streakData, roadmapProgress, updateTopicStatus, getTopicStatus, loading } = useSupabaseData();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-primary" />;
      case 'in_progress':
        return <PlayCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const cycleStatus = (topicId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'not_started' 
      ? 'in_progress' 
      : currentStatus === 'in_progress' 
        ? 'completed' 
        : 'not_started';
    updateTopicStatus(topicId, nextStatus as any);
  };

  const calculateMonthProgress = (monthIndex: number) => {
    const month = dsaRoadmap[monthIndex];
    const completedTopics = month.topics.filter(
      topic => getTopicStatus(topic.id) === 'completed'
    ).length;
    return Math.round((completedTopics / month.topics.length) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl gradient-primary animate-bounce" />
          <p className="text-muted-foreground">Loading roadmap...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentStreak={streakData.currentStreak} />
      
      <main className="container mx-auto px-4 py-6 space-y-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">
            3-Month <span className="text-gradient">DSA Roadmap</span>
          </h1>
          <p className="text-muted-foreground">
            Follow this structured path to master Data Structures & Algorithms
          </p>
        </div>

        {dsaRoadmap.map((month, monthIndex) => {
          const progress = calculateMonthProgress(monthIndex);
          
          return (
            <Card key={month.month} variant="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      Month {month.month}: {month.title}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {month.description}
                    </CardDescription>
                  </div>
                  <Badge variant={progress === 100 ? 'streak' : 'secondary'} className="text-sm">
                    {progress}% Complete
                  </Badge>
                </div>
                <Progress value={progress} className="h-2 mt-4" />
              </CardHeader>
              <CardContent className="space-y-4">
                {month.topics.map((topic) => {
                  const status = getTopicStatus(topic.id);
                  
                  return (
                    <div
                      key={topic.id}
                      className={cn(
                        "p-4 rounded-lg border transition-all cursor-pointer hover:border-primary/50",
                        status === 'completed' && "bg-primary/5 border-primary/30",
                        status === 'in_progress' && "bg-yellow-500/5 border-yellow-500/30",
                        status === 'not_started' && "bg-muted/30 border-border"
                      )}
                      onClick={() => cycleStatus(topic.id, status)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-0.5">
                          {getStatusIcon(status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{topic.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {topic.estimatedDays} days
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {topic.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {topic.recommendedProblems.slice(0, 5).map((problem, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {problem}
                              </Badge>
                            ))}
                            {topic.recommendedProblems.length > 5 && (
                              <Badge variant="outline" className="text-xs">
                                +{topic.recommendedProblems.length - 5} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </main>
    </div>
  );
};

export default Roadmap;
