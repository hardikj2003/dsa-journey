import { useBadges, Badge, BADGE_DEFINITIONS } from "@/hooks/useBadges";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Award, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface BadgeItemProps {
  badge: Badge;
}

function BadgeItem({ badge }: BadgeItemProps) {
  const isEarned = !!badge.earnedAt;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 cursor-pointer",
              isEarned
                ? "bg-primary/10 border border-primary/30 hover:border-primary/50 hover:scale-105"
                : "bg-muted/30 border border-border/50 opacity-50 grayscale"
            )}
          >
            <span className="text-2xl mb-1">{badge.icon}</span>
            <span className={cn(
              "text-xs font-medium text-center line-clamp-1",
              isEarned ? "text-foreground" : "text-muted-foreground"
            )}>
              {badge.name}
            </span>
            {!isEarned && (
              <Lock className="absolute top-1 right-1 h-3 w-3 text-muted-foreground" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-1">
            <p className="font-semibold">{badge.name}</p>
            <p className="text-sm text-muted-foreground">{badge.description}</p>
            {isEarned && badge.earnedAt && (
              <p className="text-xs text-primary">
                Earned {format(new Date(badge.earnedAt), "MMM d, yyyy")}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface BadgesSectionProps {
  title: string;
  badges: Badge[];
}

function BadgesSection({ title, badges }: BadgesSectionProps) {
  const earnedCount = badges.filter(b => b.earnedAt).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
        <span className="text-xs text-muted-foreground">
          {earnedCount}/{badges.length}
        </span>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
        {badges.map((badge) => (
          <BadgeItem key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  );
}

export function BadgesDisplay() {
  const { getBadgesWithStatus, loading, earnedBadges } = useBadges();

  if (loading) {
    return (
      <Card variant="glass">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded-xl"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const allBadges = getBadgesWithStatus();
  const streakBadges = allBadges.filter(b => b.category === 'streak');
  const problemBadges = allBadges.filter(b => b.category === 'problems');
  const roadmapBadges = allBadges.filter(b => b.category === 'roadmap');

  const totalEarned = earnedBadges.length;
  const totalBadges = BADGE_DEFINITIONS.length;

  return (
    <Card variant="glass">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Achievements
          </div>
          <span className="text-sm font-normal text-muted-foreground">
            {totalEarned}/{totalBadges} unlocked
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <BadgesSection title="🔥 Streak Milestones" badges={streakBadges} />
        <BadgesSection title="🎯 Problem Milestones" badges={problemBadges} />
        <BadgesSection title="📚 Roadmap Progress" badges={roadmapBadges} />
      </CardContent>
    </Card>
  );
}
