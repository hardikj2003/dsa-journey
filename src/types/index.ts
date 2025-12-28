export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Platform = 'LeetCode' | 'GeeksforGeeks' | 'Codeforces' | 'HackerRank' | 'CodeChef' | 'Other';

export type Topic = 
  | 'Arrays'
  | 'Strings'
  | 'Hashing'
  | 'Recursion'
  | 'Sorting'
  | 'Stack'
  | 'Queue'
  | 'Linked List'
  | 'Binary Search'
  | 'Trees'
  | 'Heaps'
  | 'Greedy'
  | 'Graphs'
  | 'Dynamic Programming'
  | 'Tries'
  | 'Backtracking'
  | 'Sliding Window'
  | 'Two Pointers'
  | 'Bit Manipulation'
  | 'Math'
  | 'Other';

export type RoadmapStatus = 'not_started' | 'in_progress' | 'completed';

export interface Problem {
  id: string;
  name: string;
  platform: Platform;
  difficulty: Difficulty;
  topic: Topic;
  timeSpent: number; // in minutes
  notes: string;
  codeSnippet?: string;
  date: string;
  isBookmarked: boolean;
  tags: string[];
}

export interface DayActivity {
  date: string;
  problemCount: number;
  problems: Problem[];
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalProblems: number;
  lastActivityDate: string | null;
}

export interface RoadmapTopic {
  id: string;
  name: string;
  description: string;
  estimatedDays: number;
  status: RoadmapStatus;
  recommendedProblems: string[];
  completedProblems: number;
}

export interface RoadmapMonth {
  month: number;
  title: string;
  description: string;
  topics: RoadmapTopic[];
}

export interface UserStats {
  totalProblems: number;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  topicDistribution: Record<Topic, number>;
  weeklyProgress: { day: string; count: number }[];
  monthlyProgress: { month: string; count: number }[];
}
