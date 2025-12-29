import { useState } from 'react';
import { Header } from '@/components/Header';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { fullRoadmap, topicDetails } from '@/data/roadmap';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  CheckCircle2, Circle, PlayCircle, Clock, ChevronDown, ChevronRight,
  BookOpen, Target, AlertTriangle, Lightbulb, ExternalLink, Calendar,
  Brain, TrendingUp, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DayPlan, WeekPlan, TopicDetail } from '@/types';

const Roadmap = () => {
  const { streakData, updateTopicStatus, getTopicStatus, loading } = useSupabaseData();
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([1]);
  const [expandedDays, setExpandedDays] = useState<number[]>([]);

  const toggleWeek = (week: number) => {
    setExpandedWeeks(prev => 
      prev.includes(week) ? prev.filter(w => w !== week) : [...prev, week]
    );
  };

  const toggleDay = (day: number) => {
    setExpandedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'Hard':
        return 'bg-red-500/20 text-red-500 border-red-500/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const cycleDayStatus = (dayId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'not_started' 
      ? 'in_progress' 
      : currentStatus === 'in_progress' 
        ? 'completed' 
        : 'not_started';
    updateTopicStatus(dayId, nextStatus as any);
  };

  const currentMonth = fullRoadmap.find(m => m.month === selectedMonth);
  
  const calculateWeekProgress = (week: WeekPlan) => {
    const completedDays = week.days.filter(
      day => getTopicStatus(`day-${day.day}`) === 'completed'
    ).length;
    return Math.round((completedDays / week.days.length) * 100);
  };

  const calculateMonthProgress = () => {
    if (!currentMonth?.weeks.length) return 0;
    const totalDays = currentMonth.weeks.reduce((acc, week) => acc + week.days.length, 0);
    const completedDays = currentMonth.weeks.reduce((acc, week) => 
      acc + week.days.filter(day => getTopicStatus(`day-${day.day}`) === 'completed').length, 0
    );
    return totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
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
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold">
            90-Day <span className="text-gradient">DSA Roadmap</span>
          </h1>
          <p className="text-muted-foreground">
            Master Data Structures & Algorithms with this structured, interview-focused curriculum
          </p>
        </div>

        {/* Month Tabs */}
        <Tabs value={`month-${selectedMonth}`} onValueChange={(v) => setSelectedMonth(parseInt(v.split('-')[1]))}>
          <TabsList className="grid w-full grid-cols-3 h-auto">
            {fullRoadmap.map((month) => (
              <TabsTrigger 
                key={month.month} 
                value={`month-${month.month}`}
                className="flex flex-col py-3 gap-1"
              >
                <span className="font-semibold">Month {month.month}</span>
                <span className="text-xs text-muted-foreground hidden sm:block">{month.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {fullRoadmap.map((month) => (
            <TabsContent key={month.month} value={`month-${month.month}`} className="space-y-6 mt-6">
              {/* Month Overview Card */}
              <Card variant="glass">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Month {month.month}: {month.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {month.description}
                      </CardDescription>
                    </div>
                    <Badge variant={calculateMonthProgress() === 100 ? 'streak' : 'secondary'} className="shrink-0">
                      {calculateMonthProgress()}% Complete
                    </Badge>
                  </div>
                  <Progress value={calculateMonthProgress()} className="h-2 mt-4" />
                  
                  {/* Milestone */}
                  <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <Target className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Monthly Milestone</p>
                      <p className="text-sm text-muted-foreground">{month.monthlyMilestone}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Topic Details Section */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Topics Covered This Month
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {month.topics.map((topic) => (
                      <TopicCard key={topic.id} topic={topic} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Breakdown */}
              {month.weeks.length > 0 ? (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Weekly Breakdown
                  </h2>
                  
                  {month.weeks.map((week) => (
                    <Card key={week.week} variant="glass">
                      <Collapsible 
                        open={expandedWeeks.includes(week.week)}
                        onOpenChange={() => toggleWeek(week.week)}
                      >
                        <CollapsibleTrigger asChild>
                          <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {expandedWeeks.includes(week.week) ? (
                                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                )}
                                <div>
                                  <CardTitle className="text-base">
                                    Week {week.week}: {week.title}
                                  </CardTitle>
                                  <CardDescription className="mt-1">
                                    {week.focus}
                                  </CardDescription>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right hidden sm:block">
                                  <p className="text-sm font-medium">{calculateWeekProgress(week)}%</p>
                                  <p className="text-xs text-muted-foreground">Complete</p>
                                </div>
                                <Progress value={calculateWeekProgress(week)} className="w-20 h-2" />
                              </div>
                            </div>
                            
                            {/* Week Meta Info */}
                            <div className="flex flex-wrap gap-2 mt-3 ml-8">
                              <Badge variant="outline" className="text-xs">
                                <Zap className="h-3 w-3 mr-1" />
                                {week.interviewPattern}
                              </Badge>
                              {week.milestone && (
                                <Badge variant="secondary" className="text-xs">
                                  🎯 {week.milestone}
                                </Badge>
                              )}
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          <CardContent className="pt-0 space-y-3">
                            {/* Weekly Goal */}
                            <div className="p-3 rounded-lg bg-muted/30 border border-border mb-4">
                              <p className="text-sm">
                                <span className="font-medium">Weekly Goal:</span>{' '}
                                <span className="text-muted-foreground">{week.weeklyGoal}</span>
                              </p>
                            </div>
                            
                            {/* Days */}
                            {week.days.map((day) => (
                              <DayCard 
                                key={day.day}
                                day={day}
                                isExpanded={expandedDays.includes(day.day)}
                                onToggle={() => toggleDay(day.day)}
                                getStatus={() => getTopicStatus(`day-${day.day}`)}
                                onCycleStatus={() => cycleDayStatus(`day-${day.day}`, getTopicStatus(`day-${day.day}`))}
                                getStatusIcon={getStatusIcon}
                                getDifficultyColor={getDifficultyColor}
                              />
                            ))}
                          </CardContent>
                        </CollapsibleContent>
                      </Collapsible>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card variant="glass">
                  <CardContent className="py-12 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Detailed daily schedule for Month {month.month} coming soon...
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

// Topic Card Component
const TopicCard = ({ topic }: { topic: TopicDetail }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div className="p-4 rounded-lg border bg-card hover:border-primary/30 transition-colors">
        <CollapsibleTrigger asChild>
          <button className="w-full text-left">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-medium">{topic.name}</h4>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {topic.conceptSummary}
                </p>
              </div>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
            </div>
          </button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="mt-4 space-y-3 text-sm">
            {/* Prerequisites */}
            <div>
              <p className="font-medium text-xs uppercase text-muted-foreground mb-1">Prerequisites</p>
              <div className="flex flex-wrap gap-1">
                {topic.prerequisites.map((prereq, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {prereq}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Key Patterns */}
            <div>
              <p className="font-medium text-xs uppercase text-muted-foreground mb-1">Key Patterns</p>
              <div className="flex flex-wrap gap-1">
                {topic.keyPatterns.map((pattern, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {pattern}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Common Mistakes */}
            <div>
              <p className="font-medium text-xs uppercase text-muted-foreground mb-1 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> Common Mistakes
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                {topic.commonMistakes.slice(0, 3).map((mistake, i) => (
                  <li key={i} className="text-xs">{mistake}</li>
                ))}
              </ul>
            </div>
            
            {/* Interview Relevance */}
            <div className="p-2 rounded bg-primary/5 border border-primary/20">
              <p className="text-xs">
                <span className="font-medium">Interview Tip:</span>{' '}
                <span className="text-muted-foreground">{topic.interviewRelevance}</span>
              </p>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

// Day Card Component
const DayCard = ({ 
  day, 
  isExpanded, 
  onToggle, 
  getStatus, 
  onCycleStatus,
  getStatusIcon,
  getDifficultyColor
}: { 
  day: DayPlan;
  isExpanded: boolean;
  onToggle: () => void;
  getStatus: () => string;
  onCycleStatus: () => void;
  getStatusIcon: (status: string) => JSX.Element;
  getDifficultyColor: (difficulty: string) => string;
}) => {
  const status = getStatus();
  
  return (
    <div className={cn(
      "rounded-lg border transition-all",
      status === 'completed' && "bg-primary/5 border-primary/30",
      status === 'in_progress' && "bg-yellow-500/5 border-yellow-500/30",
      status === 'not_started' && "bg-card border-border"
    )}>
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <div className="flex items-center gap-3 p-3">
          <button
            onClick={(e) => { e.stopPropagation(); onCycleStatus(); }}
            className="shrink-0 hover:scale-110 transition-transform"
          >
            {getStatusIcon(status)}
          </button>
          
          <CollapsibleTrigger asChild>
            <button className="flex-1 text-left flex items-center justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm">Day {day.day}</span>
                  <span className="text-muted-foreground text-sm">—</span>
                  <span className="text-sm truncate">{day.topic}</span>
                  {day.isRevisionDay && (
                    <Badge variant="outline" className="text-xs">📚 Revision</Badge>
                  )}
                  {day.isMockInterview && (
                    <Badge variant="streak" className="text-xs">🎯 Mock Interview</Badge>
                  )}
                  {day.isBufferDay && (
                    <Badge variant="secondary" className="text-xs">⏳ Buffer</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{day.timeEstimate} mins</span>
                  <span>•</span>
                  <span>{day.problems.length} problems</span>
                </div>
              </div>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
            </button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          <div className="px-3 pb-3 pt-1 space-y-4 border-t border-border/50 mt-1">
            {/* Subtopics & Concepts */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="font-medium text-xs uppercase text-muted-foreground mb-2 flex items-center gap-1">
                  <BookOpen className="h-3 w-3" /> Subtopics
                </p>
                <div className="flex flex-wrap gap-1">
                  {day.subtopics.map((subtopic, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {subtopic}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-medium text-xs uppercase text-muted-foreground mb-2 flex items-center gap-1">
                  <Lightbulb className="h-3 w-3" /> Concepts
                </p>
                <ul className="text-xs text-muted-foreground space-y-0.5">
                  {day.concepts.slice(0, 3).map((concept, i) => (
                    <li key={i}>• {concept}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Problems */}
            <div>
              <p className="font-medium text-xs uppercase text-muted-foreground mb-2">
                Practice Problems
              </p>
              <div className="space-y-2">
                {day.problems.map((problem, i) => (
                  <div 
                    key={i}
                    className={cn(
                      "flex items-center justify-between p-2 rounded-md border bg-background/50",
                      problem.isRevision && "border-primary/30 bg-primary/5"
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm truncate">{problem.name}</span>
                      {problem.isRevision && (
                        <Badge variant="outline" className="text-xs shrink-0">Revision</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge className={cn("text-xs", getDifficultyColor(problem.difficulty))}>
                        {problem.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs hidden sm:inline-flex">
                        {problem.platform}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Expected Outcome */}
            <div className="p-3 rounded-lg bg-muted/30 border border-border">
              <p className="text-sm">
                <span className="font-medium">Expected Outcome:</span>{' '}
                <span className="text-muted-foreground">{day.expectedOutcome}</span>
              </p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Roadmap;
