import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Problem, DayActivity, StreakData, RoadmapMonth, Topic, Difficulty, UserStats } from '@/types';
import { dsaRoadmap } from '@/data/roadmap';

interface AppState {
  // Problems
  problems: Problem[];
  addProblem: (problem: Omit<Problem, 'id'>) => void;
  updateProblem: (id: string, updates: Partial<Problem>) => void;
  deleteProblem: (id: string) => void;
  toggleBookmark: (id: string) => void;

  // Streak
  streakData: StreakData;
  updateStreak: () => void;

  // Roadmap
  roadmap: RoadmapMonth[];
  updateTopicStatus: (topicId: string, status: 'not_started' | 'in_progress' | 'completed') => void;

  // Computed
  getActivityByDate: (date: string) => DayActivity | null;
  getActivityCalendar: (days: number) => { date: string; count: number }[];
  getUserStats: () => UserStats;
  getRecentProblems: (limit: number) => Problem[];
}

const generateId = () => Math.random().toString(36).substring(2, 15);

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

  // Check if there's activity today or yesterday to start the streak
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

  // Calculate longest streak
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

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      problems: [],
      streakData: { currentStreak: 0, longestStreak: 0, totalProblems: 0, lastActivityDate: null },
      roadmap: dsaRoadmap,

      addProblem: (problem) => {
        const newProblem: Problem = { ...problem, id: generateId() };
        set((state) => {
          const newProblems = [...state.problems, newProblem];
          return { 
            problems: newProblems,
            streakData: calculateStreak(newProblems)
          };
        });
      },

      updateProblem: (id, updates) => {
        set((state) => ({
          problems: state.problems.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          )
        }));
      },

      deleteProblem: (id) => {
        set((state) => {
          const newProblems = state.problems.filter((p) => p.id !== id);
          return { 
            problems: newProblems,
            streakData: calculateStreak(newProblems)
          };
        });
      },

      toggleBookmark: (id) => {
        set((state) => ({
          problems: state.problems.map((p) =>
            p.id === id ? { ...p, isBookmarked: !p.isBookmarked } : p
          )
        }));
      },

      updateStreak: () => {
        set((state) => ({
          streakData: calculateStreak(state.problems)
        }));
      },

      updateTopicStatus: (topicId, status) => {
        set((state) => ({
          roadmap: state.roadmap.map((month) => ({
            ...month,
            topics: month.topics.map((topic) =>
              topic.id === topicId ? { ...topic, status } : topic
            )
          }))
        }));
      },

      getActivityByDate: (date) => {
        const problems = get().problems.filter((p) => p.date === date);
        if (problems.length === 0) return null;
        return { date, problemCount: problems.length, problems };
      },

      getActivityCalendar: (days) => {
        const result: { date: string; count: number }[] = [];
        const problems = get().problems;

        for (let i = days - 1; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          const count = problems.filter((p) => p.date === dateStr).length;
          result.push({ date: dateStr, count });
        }

        return result;
      },

      getUserStats: () => {
        const problems = get().problems;
        
        const topicDistribution: Record<Topic, number> = {} as Record<Topic, number>;
        problems.forEach((p) => {
          topicDistribution[p.topic] = (topicDistribution[p.topic] || 0) + 1;
        });

        const last7Days: { day: string; count: number }[] = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          last7Days.push({
            day: dayName,
            count: problems.filter((p) => p.date === dateStr).length
          });
        }

        return {
          totalProblems: problems.length,
          easyCount: problems.filter((p) => p.difficulty === 'Easy').length,
          mediumCount: problems.filter((p) => p.difficulty === 'Medium').length,
          hardCount: problems.filter((p) => p.difficulty === 'Hard').length,
          topicDistribution,
          weeklyProgress: last7Days,
          monthlyProgress: []
        };
      },

      getRecentProblems: (limit) => {
        return [...get().problems]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, limit);
      }
    }),
    {
      name: 'dsa-tracker-storage'
    }
  )
);
