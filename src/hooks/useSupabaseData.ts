import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type Problem = Database['public']['Tables']['problems']['Row'];
type RoadmapProgress = Database['public']['Tables']['roadmap_progress']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalProblems: number;
  lastActivityDate: string | null;
}

interface UserStats {
  totalProblems: number;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  weeklyProgress: { day: string; count: number }[];
}

export function useSupabaseData() {
  const { user } = useAuth();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [roadmapProgress, setRoadmapProgress] = useState<RoadmapProgress[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    totalProblems: 0,
    lastActivityDate: null
  });

  // Fetch all data
  const fetchData = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const [problemsRes, progressRes, profileRes] = await Promise.all([
        supabase.from('problems').select('*').eq('user_id', user.id).order('date', { ascending: false }),
        supabase.from('roadmap_progress').select('*').eq('user_id', user.id),
        supabase.from('profiles').select('*').eq('user_id', user.id).maybeSingle()
      ]);

      if (problemsRes.data) setProblems(problemsRes.data);
      if (progressRes.data) setRoadmapProgress(progressRes.data);
      if (profileRes.data) setProfile(profileRes.data);

      // Calculate streak
      if (problemsRes.data) {
        const streak = calculateStreak(problemsRes.data);
        setStreakData(streak);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Calculate streak from problems
  const calculateStreak = (problems: Problem[]): StreakData => {
    if (problems.length === 0) {
      return { currentStreak: 0, longestStreak: 0, totalProblems: 0, lastActivityDate: null };
    }

    const sortedDates = [...new Set(problems.map(p => p.date))].sort().reverse();
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    if (sortedDates[0] === today || sortedDates[0] === yesterday) {
      for (let i = 0; i < sortedDates.length; i++) {
        const currentDate = new Date(sortedDates[i]);
        const expectedDate = new Date(today);
        expectedDate.setDate(expectedDate.getDate() - i - (sortedDates[0] === yesterday ? 1 : 0));

        if (currentDate.toISOString().split('T')[0] === expectedDate.toISOString().split('T')[0]) {
          currentStreak++;
        } else {
          break;
        }
      }
    }

    for (let i = 0; i < sortedDates.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const prevDate = new Date(sortedDates[i - 1]);
        const currDate = new Date(sortedDates[i]);
        const diffDays = (prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24);

        if (diffDays === 1) {
          tempStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

    return {
      currentStreak,
      longestStreak,
      totalProblems: problems.length,
      lastActivityDate: sortedDates[0] || null
    };
  };

  // Add a problem
  const addProblem = async (problem: Omit<Problem, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return { error: 'Not authenticated' };

    const { data, error } = await supabase
      .from('problems')
      .insert({
        ...problem,
        user_id: user.id
      })
      .select()
      .single();

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      return { error };
    }

    setProblems(prev => [data, ...prev]);
    setStreakData(calculateStreak([data, ...problems]));
    toast({ title: '🎉 Problem logged!', description: `"${problem.name}" has been added.` });
    return { data };
  };

  // Toggle bookmark
  const toggleBookmark = async (id: string) => {
    const problem = problems.find(p => p.id === id);
    if (!problem) return;

    const { error } = await supabase
      .from('problems')
      .update({ is_bookmarked: !problem.is_bookmarked })
      .eq('id', id);

    if (!error) {
      setProblems(prev => prev.map(p => 
        p.id === id ? { ...p, is_bookmarked: !p.is_bookmarked } : p
      ));
    }
  };

  // Delete problem
  const deleteProblem = async (id: string) => {
    const { error } = await supabase.from('problems').delete().eq('id', id);

    if (!error) {
      const newProblems = problems.filter(p => p.id !== id);
      setProblems(newProblems);
      setStreakData(calculateStreak(newProblems));
      toast({ title: 'Deleted', description: 'Problem removed from your log.' });
    }
  };

  // Update roadmap topic status
  const updateTopicStatus = async (topicId: string, status: 'not_started' | 'in_progress' | 'completed') => {
    if (!user) return;

    const existing = roadmapProgress.find(p => p.topic_id === topicId);

    if (existing) {
      const { error } = await supabase
        .from('roadmap_progress')
        .update({ status })
        .eq('id', existing.id);

      if (!error) {
        setRoadmapProgress(prev => prev.map(p =>
          p.id === existing.id ? { ...p, status } : p
        ));
      }
    } else {
      const { data, error } = await supabase
        .from('roadmap_progress')
        .insert({ user_id: user.id, topic_id: topicId, status })
        .select()
        .single();

      if (!error && data) {
        setRoadmapProgress(prev => [...prev, data]);
      }
    }
  };

  // Get activity calendar
  const getActivityCalendar = (days: number) => {
    const result: { date: string; count: number }[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = problems.filter(p => p.date === dateStr).length;
      result.push({ date: dateStr, count });
    }

    return result;
  };

  // Get user stats
  const getUserStats = (): UserStats => {
    const last7Days: { day: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      last7Days.push({
        day: dayName,
        count: problems.filter(p => p.date === dateStr).length
      });
    }

    return {
      totalProblems: problems.length,
      easyCount: problems.filter(p => p.difficulty === 'Easy').length,
      mediumCount: problems.filter(p => p.difficulty === 'Medium').length,
      hardCount: problems.filter(p => p.difficulty === 'Hard').length,
      weeklyProgress: last7Days
    };
  };

  // Get recent problems
  const getRecentProblems = (limit: number) => {
    return problems.slice(0, limit);
  };

  // Get topic status
  const getTopicStatus = (topicId: string): 'not_started' | 'in_progress' | 'completed' => {
    const progress = roadmapProgress.find(p => p.topic_id === topicId);
    return (progress?.status as 'not_started' | 'in_progress' | 'completed') || 'not_started';
  };

  return {
    problems,
    roadmapProgress,
    profile,
    loading,
    streakData,
    addProblem,
    toggleBookmark,
    deleteProblem,
    updateTopicStatus,
    getActivityCalendar,
    getUserStats,
    getRecentProblems,
    getTopicStatus,
    refetch: fetchData
  };
}
