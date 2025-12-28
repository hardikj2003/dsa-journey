import { RoadmapMonth, TopicDetail, MonthPlan } from '@/types';
import { month1Weeks, topicDetails } from './roadmap-month1';

// Legacy format for backwards compatibility
export const dsaRoadmap: RoadmapMonth[] = [
  {
    month: 1,
    title: "Foundations",
    description: "Build strong foundation with complexity analysis, arrays, strings, hashing, and binary search",
    topics: [
      { id: "time-complexity", name: "Time & Space Complexity", description: "Master Big O notation and analyze algorithm efficiency", estimatedDays: 2, status: "not_started", recommendedProblems: ["Running Sum", "Richest Customer Wealth", "Number of Good Pairs"], completedProblems: 0 },
      { id: "arrays", name: "Arrays", description: "Array traversal, modification, prefix sum, and two pointers", estimatedDays: 5, status: "not_started", recommendedProblems: ["Two Sum", "Best Time to Buy Stock", "Container With Most Water", "3Sum", "Move Zeroes"], completedProblems: 0 },
      { id: "hashing", name: "Hashing", description: "HashMap/HashSet for O(1) lookups and frequency counting", estimatedDays: 4, status: "not_started", recommendedProblems: ["Two Sum", "Group Anagrams", "Top K Frequent", "Subarray Sum Equals K"], completedProblems: 0 },
      { id: "strings", name: "Strings", description: "String manipulation, palindromes, and pattern matching", estimatedDays: 4, status: "not_started", recommendedProblems: ["Valid Palindrome", "Longest Substring Without Repeating", "Longest Palindromic Substring"], completedProblems: 0 },
      { id: "sliding-window", name: "Sliding Window", description: "Fixed and variable size window techniques", estimatedDays: 4, status: "not_started", recommendedProblems: ["Maximum Average Subarray", "Minimum Window Substring", "Permutation in String"], completedProblems: 0 },
      { id: "recursion", name: "Recursion", description: "Recursive thinking, base cases, and call stack understanding", estimatedDays: 4, status: "not_started", recommendedProblems: ["Fibonacci", "Pow(x,n)", "Subsets", "Print Subsequences"], completedProblems: 0 },
      { id: "sorting", name: "Sorting", description: "Merge sort, quick sort, and sorting applications", estimatedDays: 4, status: "not_started", recommendedProblems: ["Sort Colors", "Merge Intervals", "Kth Largest Element"], completedProblems: 0 },
      { id: "binary-search", name: "Binary Search", description: "Standard BS, rotated arrays, and search on answer", estimatedDays: 5, status: "not_started", recommendedProblems: ["Binary Search", "Search in Rotated Array", "Koko Eating Bananas", "Find Peak Element"], completedProblems: 0 }
    ]
  },
  {
    month: 2,
    title: "Core Data Structures",
    description: "Master essential data structures: stacks, queues, linked lists, trees, and heaps",
    topics: [
      { id: "stack", name: "Stack", description: "LIFO operations, monotonic stack, expression evaluation", estimatedDays: 4, status: "not_started", recommendedProblems: ["Valid Parentheses", "Next Greater Element", "Daily Temperatures", "Largest Rectangle in Histogram"], completedProblems: 0 },
      { id: "queue", name: "Queue", description: "FIFO operations, BFS foundation, deque applications", estimatedDays: 3, status: "not_started", recommendedProblems: ["Implement Queue using Stacks", "Sliding Window Maximum", "Rotting Oranges"], completedProblems: 0 },
      { id: "linked-list", name: "Linked List", description: "Pointer manipulation, fast-slow pointers, reversal techniques", estimatedDays: 5, status: "not_started", recommendedProblems: ["Reverse Linked List", "Detect Cycle", "Merge Two Sorted Lists", "LRU Cache"], completedProblems: 0 },
      { id: "trees", name: "Trees", description: "Binary trees, BST, traversals, and tree algorithms", estimatedDays: 8, status: "not_started", recommendedProblems: ["Maximum Depth", "Validate BST", "Lowest Common Ancestor", "Binary Tree Level Order", "Serialize and Deserialize"], completedProblems: 0 },
      { id: "heaps", name: "Heaps", description: "Priority queues, top-K problems, heap operations", estimatedDays: 5, status: "not_started", recommendedProblems: ["Kth Largest Element", "Merge K Sorted Lists", "Find Median from Data Stream", "Top K Frequent"], completedProblems: 0 },
      { id: "greedy", name: "Greedy", description: "Greedy choice property, interval scheduling, optimization", estimatedDays: 5, status: "not_started", recommendedProblems: ["Jump Game", "Meeting Rooms II", "Task Scheduler", "Gas Station"], completedProblems: 0 }
    ]
  },
  {
    month: 3,
    title: "Advanced Topics",
    description: "Conquer graphs, dynamic programming, backtracking, and interview patterns",
    topics: [
      { id: "graphs", name: "Graphs", description: "BFS, DFS, topological sort, shortest path algorithms", estimatedDays: 10, status: "not_started", recommendedProblems: ["Number of Islands", "Clone Graph", "Course Schedule", "Word Ladder", "Dijkstra's Algorithm"], completedProblems: 0 },
      { id: "dynamic-programming", name: "Dynamic Programming", description: "1D/2D DP, knapsack, LIS, LCS, and state optimization", estimatedDays: 12, status: "not_started", recommendedProblems: ["Climbing Stairs", "Coin Change", "Longest Increasing Subsequence", "Edit Distance", "Longest Common Subsequence"], completedProblems: 0 },
      { id: "tries", name: "Tries", description: "Prefix trees for string operations and autocomplete", estimatedDays: 3, status: "not_started", recommendedProblems: ["Implement Trie", "Word Search II", "Design Search Autocomplete"], completedProblems: 0 },
      { id: "backtracking", name: "Backtracking", description: "Systematic exploration with pruning for constraint problems", estimatedDays: 4, status: "not_started", recommendedProblems: ["N-Queens", "Sudoku Solver", "Combination Sum", "Permutations"], completedProblems: 0 },
      { id: "bit-manipulation", name: "Bit Manipulation", description: "Bitwise operations, XOR tricks, and bit masking", estimatedDays: 3, status: "not_started", recommendedProblems: ["Single Number", "Counting Bits", "Subsets using Bitmask"], completedProblems: 0 }
    ]
  }
];

// Full detailed 90-day roadmap
export const fullRoadmap: MonthPlan[] = [
  {
    month: 1,
    title: "Foundations",
    description: "Build strong foundation with complexity analysis, arrays, strings, hashing, two pointers, sliding window, recursion, sorting, and binary search",
    weeks: month1Weeks,
    topics: topicDetails.slice(0, 10),
    monthlyMilestone: "Can solve any Easy array/string problem and most Medium problems involving basic patterns",
    mockInterviewDay: 29
  },
  {
    month: 2,
    title: "Core Data Structures",
    description: "Master stacks, queues, linked lists, trees, heaps, and greedy algorithms",
    weeks: [], // Would contain weeks 5-8
    topics: topicDetails.slice(10, 16),
    monthlyMilestone: "Comfortable with all linear data structures and tree problems",
    mockInterviewDay: 59
  },
  {
    month: 3,
    title: "Advanced Topics",
    description: "Conquer graphs, dynamic programming, tries, backtracking, and interview patterns",
    weeks: [], // Would contain weeks 9-12
    topics: topicDetails.slice(16),
    monthlyMilestone: "Interview-ready with ability to solve most Medium and some Hard problems",
    mockInterviewDay: 89
  }
];

export { topicDetails };
