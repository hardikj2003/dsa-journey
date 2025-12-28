import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useStore } from '@/store/useStore';
import { getTopicIcon } from '@/data/roadmap';
import { ChevronRight, CheckCircle2, Circle, PlayCircle } from 'lucide-react';

export function RoadmapPreview() {
  const roadmap = useStore((state) => state.roadmap);
  const updateTopicStatus = useStore((state) => state.updateTopicStatus);

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
  const monthProgress = roadmap.map((month) => {
    const completed = month.topics.filter((t) => t.status === 'completed').length;
    return Math.round((completed / month.topics.length) * 100);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>3-Month Roadmap</span>
          <Badge variant="outline" className="font-normal">
            {roadmap.reduce((sum, m) => sum + m.topics.filter(t => t.status === 'completed').length, 0)} / 
            {roadmap.reduce((sum, m) => sum + m.topics.length, 0)} topics
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {roadmap.map((month, monthIndex) => (
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
              {month.topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => cycleStatus(topic.id, topic.status)}
                  className={`flex items-center gap-2 p-2 rounded-lg text-left text-sm transition-all
                    ${topic.status === 'completed' ? 'bg-primary/10 text-primary' : 
                      topic.status === 'in_progress' ? 'bg-accent/10 text-accent' : 
                      'bg-secondary hover:bg-secondary/80'}`}
                >
                  {getStatusIcon(topic.status)}
                  <span className="mr-1">{getTopicIcon(topic.name)}</span>
                  <span className="truncate">{topic.name}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
