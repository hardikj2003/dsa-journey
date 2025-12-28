import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { StatsCards } from '@/components/StatsCards';
import { StreakCalendar } from '@/components/StreakCalendar';
import { RecentProblems } from '@/components/RecentProblems';
import { RoadmapPreview } from '@/components/RoadmapPreview';
import { ProgressCharts } from '@/components/ProgressCharts';
import { ReminderSettings } from '@/components/ReminderSettings';
import { BadgesDisplay } from '@/components/BadgesDisplay';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { useAuth } from '@/hooks/useAuth';
import { useBadges } from '@/hooks/useBadges';
import { dsaRoadmap } from '@/data/roadmap';

const Index = () => {
  const { user } = useAuth();
  const { streakData, roadmapProgress, loading } = useSupabaseData();
  const { checkAndAwardBadges } = useBadges();
  
  const displayName = user?.user_metadata?.display_name || 'Developer';

  // Check and award badges when data changes
  useEffect(() => {
    if (!loading && streakData.totalProblems >= 0) {
      // Calculate completed months
      const completedMonths: number[] = [];
      dsaRoadmap.forEach(month => {
        const monthTopics = month.topics;
        const completedTopics = monthTopics.filter(topic => 
          roadmapProgress.find(p => p.topic_id === topic.id && p.status === 'completed')
        );
        if (completedTopics.length === monthTopics.length && monthTopics.length > 0) {
          completedMonths.push(month.month);
        }
      });

      checkAndAwardBadges(
        streakData.currentStreak,
        streakData.longestStreak,
        streakData.totalProblems,
        completedMonths
      );
    }
  }, [loading, streakData, roadmapProgress, checkAndAwardBadges]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl gradient-primary animate-bounce" />
          <p className="text-muted-foreground">Loading your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentStreak={streakData.currentStreak} />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Section */}
        <section className="animate-fade-in-up">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Welcome back, <span className="text-gradient">{displayName}</span>
              </h2>
              <p className="text-muted-foreground mt-1">
                Track your progress and stay consistent with your DSA practice.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <StatsCards />
        </section>

        {/* Streak Calendar */}
        <section className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span>Contribution Calendar</span>
                <span className="text-sm font-normal text-muted-foreground">
                  Last 365 days
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StreakCalendar days={365} />
            </CardContent>
          </Card>
        </section>

        {/* Badges Section */}
        <section className="animate-fade-in" style={{ animationDelay: '300ms' }}>
          <BadgesDisplay />
        </section>

        {/* Main Content Grid */}
        <section className="grid lg:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <RecentProblems limit={5} />
          <div className="space-y-6">
            <ProgressCharts />
            <ReminderSettings />
          </div>
        </section>

        {/* Roadmap Section */}
        <section className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <RoadmapPreview />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Built for developers, by developers. Keep grinding! 💪
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Feedback
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
