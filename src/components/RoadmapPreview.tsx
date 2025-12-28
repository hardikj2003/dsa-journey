import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { dsaRoadmap } from '@/data/roadmap';
import { CheckCircle2, Circle, PlayCircle } from 'lucide-react';

export function RoadmapPreview() {
  const { updateTopicStatus, getTopicStatus } = useSupabaseData();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-primary" />;
      case 'in_progress':
        return <PlayCircle className="h-4 w-4 text-accent" />;
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const cycleStatus = (topicId: string, currentStatus: string) => {
    const nextStatus = 
      currentStatus === 'not_started' ? 'in_progress' :
      currentStatus === 'in_progress' ? 'completed' : 'not_started';
    updateTopicStatus(topicId, nextStatus as 'not_started' | 'in_progress' | 'completed');
  };

  // Calculate progress for each month
  const monthProgress = dsaRoadmap.map((month) => {
    const completed = month.topics.filter((t) => getTopicStatus(t.id) === 'completed').length;
    return Math.round((completed / month.topics.length) * 100);
  });

  const totalCompleted = dsaRoadmap.reduce(
    (sum, month) => sum + month.topics.filter(t => getTopicStatus(t.id) === 'completed').length, 
    0
  );
  const totalTopics = dsaRoadmap.reduce((sum, m) => sum + m.topics.length, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>3-Month Roadmap</span>
          <Badge variant="outline" className="font-normal">
            {totalCompleted} / {totalTopics} topics
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {dsaRoadmap.map((month, monthIndex) => (
          <div key={month.month} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant={monthProgress[monthIndex] === 100 ? 'streak' : 'secondary'}>
                  Month {month.month}
                </Badge>
                <span className="font-medium">{month.title}</span>
              </div>
              <span className="text-sm text-muted-foreground">{monthProgress[monthIndex]}%</span>
            </div>
            <Progress value={monthProgress[monthIndex]} className="h-2" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {month.topics.map((topic) => {
                const status = getTopicStatus(topic.id);
                return (
                  <button
                    key={topic.id}
                    onClick={() => cycleStatus(topic.id, status)}
                    className={`flex items-center gap-2 p-2 rounded-lg text-left text-sm transition-all
                      ${status === 'completed' ? 'bg-primary/10 text-primary' : 
                        status === 'in_progress' ? 'bg-accent/10 text-accent' : 
                        'bg-secondary hover:bg-secondary/80'}`}
                  >
                    {getStatusIcon(status)}
                    <span className="mr-1">{getTopicIcon(topic.name)}</span>
                    <span className="truncate">{topic.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
