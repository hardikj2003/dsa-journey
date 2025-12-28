import { RoadmapMonth } from '@/types';

export const dsaRoadmap: RoadmapMonth[] = [
  {
    month: 1,
    title: "Foundations",
    description: "Build a strong base with fundamental data structures and algorithms",
    topics: [
      {
        id: "arrays",
        name: "Arrays",
        description: "Master array operations, two-pointer techniques, and array manipulation",
        estimatedDays: 5,
        status: "not_started",
        recommendedProblems: [
          "Two Sum",
          "Best Time to Buy and Sell Stock",
          "Contains Duplicate",
          "Maximum Subarray",
          "Product of Array Except Self"
        ],
        completedProblems: 0
      },
      {
        id: "strings",
        name: "Strings",
        description: "String manipulation, pattern matching, and common string algorithms",
        estimatedDays: 5,
        status: "not_started",
        recommendedProblems: [
          "Valid Anagram",
          "Valid Palindrome",
          "Longest Substring Without Repeating Characters",
          "Group Anagrams",
          "Longest Palindromic Substring"
        ],
        completedProblems: 0
      },
      {
        id: "hashing",
        name: "Hashing",
        description: "Hash maps, sets, and their applications in problem solving",
        estimatedDays: 4,
        status: "not_started",
        recommendedProblems: [
          "Two Sum",
          "First Unique Character",
          "Intersection of Two Arrays",
          "Subarray Sum Equals K",
          "Longest Consecutive Sequence"
        ],
        completedProblems: 0
      },
      {
        id: "recursion",
        name: "Recursion",
        description: "Recursive thinking, base cases, and recursive problem decomposition",
        estimatedDays: 5,
        status: "not_started",
        recommendedProblems: [
          "Fibonacci Number",
          "Climbing Stairs",
          "Power of Two",
          "Reverse String",
          "Merge Two Sorted Lists"
        ],
        completedProblems: 0
      },
      {
        id: "sorting",
        name: "Basic Sorting",
        description: "Sorting algorithms, their complexities, and applications",
        estimatedDays: 4,
        status: "not_started",
        recommendedProblems: [
          "Sort Colors",
          "Merge Intervals",
          "Insert Interval",
          "Meeting Rooms",
          "Largest Number"
        ],
        completedProblems: 0
      },
      {
        id: "complexity",
        name: "Time & Space Complexity",
        description: "Analyze algorithmic efficiency and optimize solutions",
        estimatedDays: 3,
        status: "not_started",
        recommendedProblems: [
          "Understand Big O Notation",
          "Analyze common algorithms",
          "Space complexity analysis",
          "Trade-offs between time and space",
          "Amortized analysis basics"
        ],
        completedProblems: 0
      }
    ]
  },
  {
    month: 2,
    title: "Core DSA",
    description: "Master essential data structures and algorithmic techniques",
    topics: [
      {
        id: "stack-queue",
        name: "Stack & Queue",
        description: "LIFO and FIFO data structures with real-world applications",
        estimatedDays: 5,
        status: "not_started",
        recommendedProblems: [
          "Valid Parentheses",
          "Min Stack",
          "Implement Queue using Stacks",
          "Daily Temperatures",
          "Evaluate Reverse Polish Notation"
        ],
        completedProblems: 0
      },
      {
        id: "linked-list",
        name: "Linked List",
        description: "Singly and doubly linked lists, fast-slow pointer techniques",
        estimatedDays: 5,
        status: "not_started",
        recommendedProblems: [
          "Reverse Linked List",
          "Merge Two Sorted Lists",
          "Linked List Cycle",
          "Remove Nth Node From End",
          "Reorder List"
        ],
        completedProblems: 0
      },
      {
        id: "binary-search",
        name: "Binary Search",
        description: "Divide and conquer searching, variations and applications",
        estimatedDays: 5,
        status: "not_started",
        recommendedProblems: [
          "Binary Search",
          "Search in Rotated Sorted Array",
          "Find Minimum in Rotated Sorted Array",
          "Search a 2D Matrix",
          "Median of Two Sorted Arrays"
        ],
        completedProblems: 0
      },
      {
        id: "trees",
        name: "Trees",
        description: "Binary trees, BST, tree traversals, and common tree problems",
        estimatedDays: 7,
        status: "not_started",
        recommendedProblems: [
          "Maximum Depth of Binary Tree",
          "Invert Binary Tree",
          "Same Tree",
          "Binary Tree Level Order Traversal",
          "Validate Binary Search Tree"
        ],
        completedProblems: 0
      },
      {
        id: "heaps",
        name: "Heaps",
        description: "Priority queues, heap operations, and heap-based algorithms",
        estimatedDays: 4,
        status: "not_started",
        recommendedProblems: [
          "Kth Largest Element in an Array",
          "Top K Frequent Elements",
          "Find Median from Data Stream",
          "Merge K Sorted Lists",
          "Task Scheduler"
        ],
        completedProblems: 0
      },
      {
        id: "greedy",
        name: "Greedy Algorithms",
        description: "Making locally optimal choices for global optimal solutions",
        estimatedDays: 4,
        status: "not_started",
        recommendedProblems: [
          "Jump Game",
          "Jump Game II",
          "Gas Station",
          "Hand of Straights",
          "Partition Labels"
        ],
        completedProblems: 0
      }
    ]
  },
  {
    month: 3,
    title: "Advanced",
    description: "Tackle complex problems with advanced techniques",
    topics: [
      {
        id: "graphs",
        name: "Graphs",
        description: "Graph representations, BFS, DFS, and graph algorithms",
        estimatedDays: 8,
        status: "not_started",
        recommendedProblems: [
          "Number of Islands",
          "Clone Graph",
          "Course Schedule",
          "Pacific Atlantic Water Flow",
          "Network Delay Time"
        ],
        completedProblems: 0
      },
      {
        id: "dp",
        name: "Dynamic Programming",
        description: "Optimization problems with overlapping subproblems",
        estimatedDays: 10,
        status: "not_started",
        recommendedProblems: [
          "Climbing Stairs",
          "House Robber",
          "Coin Change",
          "Longest Increasing Subsequence",
          "Longest Common Subsequence"
        ],
        completedProblems: 0
      },
      {
        id: "tries",
        name: "Tries",
        description: "Prefix trees for efficient string operations",
        estimatedDays: 3,
        status: "not_started",
        recommendedProblems: [
          "Implement Trie",
          "Design Add and Search Words Data Structure",
          "Word Search II",
          "Replace Words",
          "Palindrome Pairs"
        ],
        completedProblems: 0
      },
      {
        id: "backtracking",
        name: "Backtracking",
        description: "Systematic exploration of solution space",
        estimatedDays: 5,
        status: "not_started",
        recommendedProblems: [
          "Subsets",
          "Permutations",
          "Combination Sum",
          "N-Queens",
          "Word Search"
        ],
        completedProblems: 0
      },
      {
        id: "sliding-window",
        name: "Sliding Window",
        description: "Efficient subarray/substring problems",
        estimatedDays: 4,
        status: "not_started",
        recommendedProblems: [
          "Best Time to Buy and Sell Stock",
          "Longest Substring Without Repeating Characters",
          "Minimum Window Substring",
          "Sliding Window Maximum",
          "Permutation in String"
        ],
        completedProblems: 0
      },
      {
        id: "patterns",
        name: "Interview Patterns",
        description: "Common patterns that appear in coding interviews",
        estimatedDays: 5,
        status: "not_started",
        recommendedProblems: [
          "LRU Cache",
          "Design Twitter",
          "Serialize and Deserialize Binary Tree",
          "Alien Dictionary",
          "Meeting Rooms II"
        ],
        completedProblems: 0
      }
    ]
  }
];

export const getTopicIcon = (topicName: string): string => {
  const icons: Record<string, string> = {
    "Arrays": "📊",
    "Strings": "🔤",
    "Hashing": "#️⃣",
    "Recursion": "🔄",
    "Basic Sorting": "📈",
    "Time & Space Complexity": "⏱️",
    "Stack & Queue": "📚",
    "Linked List": "🔗",
    "Binary Search": "🔍",
    "Trees": "🌳",
    "Heaps": "⛰️",
    "Greedy Algorithms": "🎯",
    "Graphs": "🕸️",
    "Dynamic Programming": "🧩",
    "Tries": "🔠",
    "Backtracking": "↩️",
    "Sliding Window": "🪟",
    "Interview Patterns": "💼"
  };
  return icons[topicName] || "📝";
};
