import { Flame, Trophy, Calendar, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useStore } from '@/store/useStore';

export function StatsCards() {
  const streakData = useStore((state) => state.streakData);
  const getUserStats = useStore((state) => state.getUserStats);
  const roadmap = useStore((state) => state.roadmap);
  
  const stats = getUserStats();
  
  // Calculate roadmap progress
  const totalTopics = roadmap.reduce((sum, month) => sum + month.topics.length, 0);
  const completedTopics = roadmap.reduce(
    (sum, month) => sum + month.topics.filter(t => t.status === 'completed').length,
    0
  );
  const roadmapProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  const cards = [
    {
      title: 'Current Streak',
      value: streakData.currentStreak,
      suffix: 'days',
      icon: Flame,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      isStreak: true
    },
    {
      title: 'Longest Streak',
      value: streakData.longestStreak,
      suffix: 'days',
      icon: Trophy,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10'
    },
    {
      title: 'Total Problems',
      value: stats.totalProblems,
      suffix: 'solved',
      icon: Calendar,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Roadmap Progress',
      value: roadmapProgress,
      suffix: '%',
      icon: Target,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card 
          key={card.title} 
          variant={card.isStreak && streakData.currentStreak > 0 ? 'streak' : 'default'}
          className={`card-hover ${card.isStreak && streakData.currentStreak > 0 ? 'animate-pulse-glow' : ''}`}
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{card.title}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-bold animate-count-up">
                    {card.value}
                  </span>
                  <span className="text-sm text-muted-foreground">{card.suffix}</span>
                </div>
              </div>
              <div className={`p-2 sm:p-3 rounded-xl ${card.bgColor}`}>
                <card.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${card.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
