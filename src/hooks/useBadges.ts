import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export type BadgeType = 
  | 'streak_7'
  | 'streak_30' 
  | 'streak_100'
  | 'streak_365'
  | 'problems_10'
  | 'problems_50'
  | 'problems_100'
  | 'problems_500'
  | 'first_problem'
  | 'roadmap_month_1'
  | 'roadmap_month_2'
  | 'roadmap_month_3'
  | 'roadmap_complete';

export interface Badge {
  id: string;
  type: BadgeType;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
  requirement: number;
  category: 'streak' | 'problems' | 'roadmap';
}

export const BADGE_DEFINITIONS: Omit<Badge, 'id' | 'earnedAt'>[] = [
  // Streak badges
  { type: 'streak_7', name: 'Week Warrior', description: '7-day streak', icon: '🔥', requirement: 7, category: 'streak' },
  { type: 'streak_30', name: 'Monthly Master', description: '30-day streak', icon: '⚡', requirement: 30, category: 'streak' },
  { type: 'streak_100', name: 'Century Club', description: '100-day streak', icon: '💎', requirement: 100, category: 'streak' },
  { type: 'streak_365', name: 'Year of Code', description: '365-day streak', icon: '👑', requirement: 365, category: 'streak' },
  
  // Problem badges
  { type: 'first_problem', name: 'First Steps', description: 'Solve your first problem', icon: '🎯', requirement: 1, category: 'problems' },
  { type: 'problems_10', name: 'Getting Started', description: 'Solve 10 problems', icon: '🌟', requirement: 10, category: 'problems' },
  { type: 'problems_50', name: 'Problem Solver', description: 'Solve 50 problems', icon: '🏆', requirement: 50, category: 'problems' },
  { type: 'problems_100', name: 'Centurion', description: 'Solve 100 problems', icon: '🎖️', requirement: 100, category: 'problems' },
  { type: 'problems_500', name: 'DSA Legend', description: 'Solve 500 problems', icon: '🌈', requirement: 500, category: 'problems' },
  
  // Roadmap badges
  { type: 'roadmap_month_1', name: 'Foundation Builder', description: 'Complete Month 1 roadmap', icon: '📚', requirement: 1, category: 'roadmap' },
  { type: 'roadmap_month_2', name: 'Core Mastery', description: 'Complete Month 2 roadmap', icon: '🧠', requirement: 2, category: 'roadmap' },
  { type: 'roadmap_month_3', name: 'Advanced Scholar', description: 'Complete Month 3 roadmap', icon: '🚀', requirement: 3, category: 'roadmap' },
  { type: 'roadmap_complete', name: 'DSA Master', description: 'Complete entire roadmap', icon: '🎓', requirement: 100, category: 'roadmap' },
];

interface UserBadge {
  id: string;
  badge_type: BadgeType;
  earned_at: string;
}

export function useBadges() {
  const { user } = useAuth();
  const [earnedBadges, setEarnedBadges] = useState<UserBadge[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBadges = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("user_badges")
        .select("id, badge_type, earned_at")
        .eq("user_id", user.id);

      if (error) throw error;
      setEarnedBadges((data || []) as UserBadge[]);
    } catch (error) {
      console.error("Error fetching badges:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchBadges();
  }, [fetchBadges]);

  const awardBadge = useCallback(async (badgeType: BadgeType) => {
    if (!user) return false;

    // Check if already earned
    if (earnedBadges.some(b => b.badge_type === badgeType)) {
      return false;
    }

    try {
      const { error } = await supabase
        .from("user_badges")
        .insert({ user_id: user.id, badge_type: badgeType });

      if (error) {
        if (error.code === '23505') return false; // Already exists
        throw error;
      }

      const badgeDef = BADGE_DEFINITIONS.find(b => b.type === badgeType);
      if (badgeDef) {
        toast.success(`🎉 Badge Earned: ${badgeDef.name}!`, {
          description: badgeDef.description,
        });
      }

      await fetchBadges();
      return true;
    } catch (error) {
      console.error("Error awarding badge:", error);
      return false;
    }
  }, [user, earnedBadges, fetchBadges]);

  const checkAndAwardBadges = useCallback(async (
    currentStreak: number,
    longestStreak: number,
    totalProblems: number,
    completedMonths: number[]
  ) => {
    const maxStreak = Math.max(currentStreak, longestStreak);

    // Check streak badges
    if (maxStreak >= 7) await awardBadge('streak_7');
    if (maxStreak >= 30) await awardBadge('streak_30');
    if (maxStreak >= 100) await awardBadge('streak_100');
    if (maxStreak >= 365) await awardBadge('streak_365');

    // Check problem badges
    if (totalProblems >= 1) await awardBadge('first_problem');
    if (totalProblems >= 10) await awardBadge('problems_10');
    if (totalProblems >= 50) await awardBadge('problems_50');
    if (totalProblems >= 100) await awardBadge('problems_100');
    if (totalProblems >= 500) await awardBadge('problems_500');

    // Check roadmap badges
    if (completedMonths.includes(1)) await awardBadge('roadmap_month_1');
    if (completedMonths.includes(2)) await awardBadge('roadmap_month_2');
    if (completedMonths.includes(3)) await awardBadge('roadmap_month_3');
    if (completedMonths.length === 3) await awardBadge('roadmap_complete');
  }, [awardBadge]);

  const getBadgesWithStatus = useCallback((): Badge[] => {
    return BADGE_DEFINITIONS.map(def => {
      const earned = earnedBadges.find(b => b.badge_type === def.type);
      return {
        id: earned?.id || def.type,
        ...def,
        earnedAt: earned?.earned_at,
      };
    });
  }, [earnedBadges]);

  return {
    earnedBadges,
    loading,
    awardBadge,
    checkAndAwardBadges,
    getBadgesWithStatus,
    refetch: fetchBadges,
  };
}
