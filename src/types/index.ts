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
  | 'Time Complexity'
  | 'Other';

export type RoadmapStatus = 'not_started' | 'in_progress' | 'completed';

export interface Problem {
  id: string;
  name: string;
  platform: Platform;
  difficulty: Difficulty;
  topic: Topic;
  timeSpent: number;
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

// New detailed roadmap types
export interface RoadmapProblem {
  name: string;
  platform: Platform;
  difficulty: Difficulty;
  pattern: string;
  isRevision?: boolean;
  url?: string;
}

export interface DayPlan {
  day: number;
  topic: string;
  subtopics: string[];
  concepts: string[];
  problems: RoadmapProblem[];
  expectedOutcome: string;
  timeEstimate: number; // in minutes
  status: RoadmapStatus;
  isRevisionDay?: boolean;
  isMockInterview?: boolean;
  isBufferDay?: boolean;
}

export interface WeekPlan {
  week: number;
  title: string;
  focus: string;
  interviewPattern: string;
  days: DayPlan[];
  weeklyGoal: string;
  confidenceScore: number; // 1-10
  milestone?: string;
}

export interface TopicDetail {
  id: string;
  name: string;
  conceptSummary: string;
  prerequisites: string[];
  commonMistakes: string[];
  keyPatterns: string[];
  mustKnowVariations: string[];
  interviewRelevance: string;
  redFlags: string[];
  commonInterviewQuestions: string[];
}

export interface MonthPlan {
  month: number;
  title: string;
  description: string;
  weeks: WeekPlan[];
  topics: TopicDetail[];
  monthlyMilestone: string;
  mockInterviewDay: number;
}

// Legacy types for backwards compatibility
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
