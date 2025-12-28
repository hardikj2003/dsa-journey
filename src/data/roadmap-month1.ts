import { MonthPlan, TopicDetail, DayPlan, WeekPlan, RoadmapProblem, RoadmapMonth } from '@/types';

// Topic details with comprehensive information
export const topicDetails: TopicDetail[] = [
  {
    id: 'time-complexity',
    name: 'Time & Space Complexity',
    conceptSummary: 'Understanding how algorithms scale with input size using Big O notation. Critical for evaluating and comparing algorithm efficiency.',
    prerequisites: ['Basic math', 'Loops understanding'],
    commonMistakes: ['Confusing O(n) with O(n²)', 'Ignoring space complexity', 'Not considering worst case'],
    keyPatterns: ['Loop analysis', 'Recursion tree method', 'Master theorem'],
    mustKnowVariations: ['Best/Average/Worst case', 'Amortized analysis'],
    interviewRelevance: 'Asked in every interview. You must justify your solution complexity.',
    redFlags: ['Cannot explain Big O', 'Gives wrong complexity for simple code'],
    commonInterviewQuestions: ['What is the time complexity of your solution?', 'Can you optimize this?', 'What is the space complexity?']
  },
  {
    id: 'arrays',
    name: 'Arrays',
    conceptSummary: 'Contiguous memory storage for elements. Foundation for most DSA problems. Master array manipulation before moving forward.',
    prerequisites: ['Time complexity', 'Basic loops'],
    commonMistakes: ['Off-by-one errors', 'Not handling empty arrays', 'Modifying array while iterating'],
    keyPatterns: ['Two pointers', 'Sliding window', 'Prefix sum', 'Kadane\'s algorithm'],
    mustKnowVariations: ['Sorted arrays', '2D arrays', 'Circular arrays'],
    interviewRelevance: '40% of interview problems involve arrays. Master this first.',
    redFlags: ['Cannot traverse efficiently', 'Unnecessary nested loops'],
    commonInterviewQuestions: ['Find maximum subarray sum', 'Rotate array', 'Find duplicates', 'Merge sorted arrays']
  },
  {
    id: 'strings',
    name: 'Strings',
    conceptSummary: 'Immutable character sequences. String problems test pattern matching, manipulation, and optimization skills.',
    prerequisites: ['Arrays', 'ASCII/Unicode basics'],
    commonMistakes: ['String concatenation in loops (O(n²))', 'Not handling edge cases', 'Ignoring case sensitivity'],
    keyPatterns: ['Two pointers', 'Sliding window', 'Character frequency', 'String builder'],
    mustKnowVariations: ['Palindromes', 'Anagrams', 'Substrings', 'Pattern matching'],
    interviewRelevance: 'Common in FAANG interviews. Tests attention to detail.',
    redFlags: ['Inefficient string operations', 'Missing edge cases'],
    commonInterviewQuestions: ['Valid palindrome', 'Longest substring without repeating', 'String compression', 'Anagram groups']
  },
  {
    id: 'hashing',
    name: 'Hashing',
    conceptSummary: 'O(1) average lookup using hash functions. HashMap/HashSet are your best friends for optimization.',
    prerequisites: ['Arrays', 'Time complexity'],
    commonMistakes: ['Not handling collisions', 'Using wrong key type', 'Forgetting hash map overhead'],
    keyPatterns: ['Frequency counting', 'Two sum pattern', 'Grouping by hash', 'Caching results'],
    mustKnowVariations: ['Open addressing', 'Chaining', 'Rolling hash'],
    interviewRelevance: 'Hashing often reduces O(n²) to O(n). Always consider it.',
    redFlags: ['Not considering hash solution', 'Custom hash function errors'],
    commonInterviewQuestions: ['Two Sum', 'Group Anagrams', 'First unique character', 'Subarray sum equals K']
  },
  {
    id: 'two-pointers',
    name: 'Two Pointers',
    conceptSummary: 'Using two indices to traverse data structure. Reduces O(n²) to O(n) for many problems.',
    prerequisites: ['Arrays', 'Sorting'],
    commonMistakes: ['Wrong pointer movement', 'Infinite loops', 'Not handling duplicates'],
    keyPatterns: ['Opposite ends', 'Same direction', 'Fast-slow pointers', 'Sliding window'],
    mustKnowVariations: ['Sorted array', 'Linked list cycle', 'Partitioning'],
    interviewRelevance: 'Classic optimization technique. Shows algorithm design skills.',
    redFlags: ['Using brute force when two pointers work', 'Wrong pointer update logic'],
    commonInterviewQuestions: ['Container with most water', '3Sum', 'Remove duplicates', 'Trapping rain water']
  },
  {
    id: 'sliding-window',
    name: 'Sliding Window',
    conceptSummary: 'Maintaining a window of elements for subarray/substring problems. Key technique for optimization.',
    prerequisites: ['Arrays', 'Two pointers', 'Hashing'],
    commonMistakes: ['Wrong window boundaries', 'Not shrinking window properly', 'Off-by-one in calculations'],
    keyPatterns: ['Fixed size window', 'Variable size window', 'Window with constraints'],
    mustKnowVariations: ['Maximum/Minimum in window', 'Count subarrays', 'Longest/Shortest subarray'],
    interviewRelevance: 'Extremely common pattern. Must master for FAANG.',
    redFlags: ['Cannot identify sliding window problems', 'Inefficient window updates'],
    commonInterviewQuestions: ['Maximum sum subarray of size K', 'Longest substring with K distinct', 'Minimum window substring']
  },
  {
    id: 'recursion',
    name: 'Recursion',
    conceptSummary: 'Function calling itself to solve smaller subproblems. Foundation for trees, graphs, and DP.',
    prerequisites: ['Functions', 'Call stack understanding'],
    commonMistakes: ['Missing base case', 'Stack overflow', 'Not returning values', 'Redundant calculations'],
    keyPatterns: ['Base case + recursive case', 'Divide and conquer', 'Backtracking template'],
    mustKnowVariations: ['Head recursion', 'Tail recursion', 'Multiple recursive calls'],
    interviewRelevance: 'Foundation for advanced topics. Must be comfortable with it.',
    redFlags: ['Cannot trace recursive calls', 'Missing base cases'],
    commonInterviewQuestions: ['Factorial', 'Fibonacci', 'Power function', 'Print all subsequences']
  },
  {
    id: 'sorting',
    name: 'Sorting Algorithms',
    conceptSummary: 'Arranging elements in order. Know when to use which sorting algorithm and their trade-offs.',
    prerequisites: ['Arrays', 'Recursion', 'Time complexity'],
    commonMistakes: ['Using wrong sorting for the problem', 'Not stable when needed', 'Not considering in-place requirement'],
    keyPatterns: ['Comparison-based', 'Non-comparison based', 'Partial sorting', 'Custom comparators'],
    mustKnowVariations: ['Quick sort', 'Merge sort', 'Heap sort', 'Counting sort', 'Radix sort'],
    interviewRelevance: 'Sorting is often preprocessing step. Know complexities by heart.',
    redFlags: ['Cannot implement merge/quick sort', 'Wrong complexity analysis'],
    commonInterviewQuestions: ['Implement merge sort', 'Sort colors (Dutch flag)', 'Kth largest element', 'Meeting rooms']
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    conceptSummary: 'O(log n) search in sorted data. Applicable beyond arrays - search space reduction pattern.',
    prerequisites: ['Arrays', 'Sorting', 'Recursion'],
    commonMistakes: ['Off-by-one errors', 'Wrong mid calculation overflow', 'Infinite loops', 'Wrong search space'],
    keyPatterns: ['Standard binary search', 'Lower/Upper bound', 'Search on answer', 'Rotated array'],
    mustKnowVariations: ['First/Last occurrence', 'Peak element', 'Search in 2D matrix', 'Minimize maximum'],
    interviewRelevance: 'Classic algorithmic technique. Expected to implement flawlessly.',
    redFlags: ['Cannot handle edge cases', 'Infinite loop bugs'],
    commonInterviewQuestions: ['Search in rotated array', 'Find peak element', 'Koko eating bananas', 'Median of two sorted arrays']
  },
  {
    id: 'stack',
    name: 'Stack',
    conceptSummary: 'LIFO data structure. Perfect for problems involving matching, parsing, or maintaining history.',
    prerequisites: ['Arrays', 'Linked lists'],
    commonMistakes: ['Popping empty stack', 'Not using stack when beneficial', 'Wrong order of operations'],
    keyPatterns: ['Monotonic stack', 'Expression evaluation', 'Parentheses matching', 'Next greater element'],
    mustKnowVariations: ['Min stack', 'Max stack', 'Stack with increment'],
    interviewRelevance: 'Frequently tested. Monotonic stack is a common pattern.',
    redFlags: ['Cannot identify stack problems', 'Not handling empty stack'],
    commonInterviewQuestions: ['Valid parentheses', 'Next greater element', 'Largest rectangle in histogram', 'Daily temperatures']
  },
  {
    id: 'queue',
    name: 'Queue',
    conceptSummary: 'FIFO data structure. Essential for BFS, level-order processing, and scheduling problems.',
    prerequisites: ['Arrays', 'Linked lists'],
    commonMistakes: ['Dequeue from empty queue', 'Not using deque when needed', 'Circular queue bugs'],
    keyPatterns: ['BFS template', 'Level order traversal', 'Sliding window maximum', 'Task scheduling'],
    mustKnowVariations: ['Circular queue', 'Deque', 'Priority queue'],
    interviewRelevance: 'Foundation for BFS. Deque is powerful for sliding window.',
    redFlags: ['Cannot implement queue operations', 'Wrong BFS implementation'],
    commonInterviewQuestions: ['Implement queue using stacks', 'Sliding window maximum', 'Rotting oranges', 'Number of islands (BFS)']
  },
  {
    id: 'linked-list',
    name: 'Linked List',
    conceptSummary: 'Non-contiguous memory storage with pointers. Tests pointer manipulation skills.',
    prerequisites: ['Pointers/References', 'Recursion'],
    commonMistakes: ['Losing reference to head', 'Not handling null', 'Memory leaks', 'Wrong pointer updates'],
    keyPatterns: ['Fast-slow pointers', 'Reverse in place', 'Merge lists', 'Dummy head'],
    mustKnowVariations: ['Singly linked', 'Doubly linked', 'Circular linked'],
    interviewRelevance: 'Tests careful coding. Common in on-site interviews.',
    redFlags: ['Cannot reverse linked list', 'Null pointer exceptions'],
    commonInterviewQuestions: ['Reverse linked list', 'Detect cycle', 'Merge two sorted lists', 'LRU Cache']
  },
  {
    id: 'trees',
    name: 'Trees',
    conceptSummary: 'Hierarchical data structure. Binary trees and BSTs are interview favorites.',
    prerequisites: ['Recursion', 'Queue (for BFS)'],
    commonMistakes: ['Not handling null nodes', 'Wrong traversal order', 'Not using BST property'],
    keyPatterns: ['DFS (preorder, inorder, postorder)', 'BFS (level order)', 'BST search/insert', 'Tree DP'],
    mustKnowVariations: ['Binary tree', 'BST', 'N-ary tree', 'Balanced trees'],
    interviewRelevance: 'Extremely common. Expect 1-2 tree problems in interviews.',
    redFlags: ['Cannot write recursive tree traversal', 'Missing null checks'],
    commonInterviewQuestions: ['Maximum depth', 'Validate BST', 'Lowest common ancestor', 'Serialize/deserialize tree']
  },
  {
    id: 'heaps',
    name: 'Heaps',
    conceptSummary: 'Complete binary tree maintaining heap property. Efficient for K-th element and priority-based problems.',
    prerequisites: ['Arrays', 'Trees', 'Sorting'],
    commonMistakes: ['Wrong heap type (min vs max)', 'Not maintaining heap size', 'Heapify bugs'],
    keyPatterns: ['Top K elements', 'Merge K sorted', 'Running median', 'Task scheduling'],
    mustKnowVariations: ['Min heap', 'Max heap', 'Priority queue'],
    interviewRelevance: 'Common for optimization problems. Know when to use heap vs sorting.',
    redFlags: ['Cannot explain heap operations', 'Wrong complexity for heap operations'],
    commonInterviewQuestions: ['Kth largest element', 'Merge K sorted lists', 'Find median from data stream', 'Top K frequent elements']
  },
  {
    id: 'greedy',
    name: 'Greedy Algorithms',
    conceptSummary: 'Making locally optimal choices hoping for global optimum. Works when greedy choice property holds.',
    prerequisites: ['Sorting', 'Problem-solving intuition'],
    commonMistakes: ['Using greedy when DP is needed', 'Wrong greedy choice', 'Not proving correctness'],
    keyPatterns: ['Activity selection', 'Interval scheduling', 'Huffman coding', 'Fractional knapsack'],
    mustKnowVariations: ['Interval problems', 'Task scheduling', 'Minimum spanning tree'],
    interviewRelevance: 'Tests intuition. Often combined with sorting.',
    redFlags: ['Cannot identify if greedy works', 'No proof of correctness'],
    commonInterviewQuestions: ['Jump game', 'Meeting rooms II', 'Task scheduler', 'Gas station']
  },
  {
    id: 'graphs',
    name: 'Graphs',
    conceptSummary: 'Nodes connected by edges. Model real-world relationships. Master BFS, DFS, and shortest paths.',
    prerequisites: ['Recursion', 'Queue', 'Stack'],
    commonMistakes: ['Not tracking visited nodes', 'Wrong graph representation', 'Cycle in directed graph confusion'],
    keyPatterns: ['BFS', 'DFS', 'Topological sort', 'Union-Find', 'Dijkstra', 'Bellman-Ford'],
    mustKnowVariations: ['Directed/Undirected', 'Weighted', 'DAG', 'Bipartite'],
    interviewRelevance: 'Advanced topic but very common in FAANG interviews.',
    redFlags: ['Cannot implement BFS/DFS', 'Wrong visited tracking'],
    commonInterviewQuestions: ['Number of islands', 'Clone graph', 'Course schedule', 'Shortest path in maze']
  },
  {
    id: 'dynamic-programming',
    name: 'Dynamic Programming',
    conceptSummary: 'Solving problems by breaking into overlapping subproblems. Memoization or tabulation approach.',
    prerequisites: ['Recursion', 'Arrays', 'Problem decomposition'],
    commonMistakes: ['Wrong state definition', 'Missing base cases', 'Wrong recurrence relation', 'Space not optimized'],
    keyPatterns: ['1D DP', '2D DP', 'Knapsack', 'LIS/LCS', 'Partition DP', 'Interval DP'],
    mustKnowVariations: ['Top-down (memoization)', 'Bottom-up (tabulation)', 'Space optimization'],
    interviewRelevance: 'The most challenging topic. Practice extensively.',
    redFlags: ['Cannot identify DP problems', 'Cannot define states properly'],
    commonInterviewQuestions: ['Climbing stairs', 'Coin change', 'Longest increasing subsequence', 'Edit distance']
  },
  {
    id: 'tries',
    name: 'Tries',
    conceptSummary: 'Tree-like structure for storing strings. Efficient prefix operations.',
    prerequisites: ['Trees', 'Strings', 'Hashing'],
    commonMistakes: ['Memory inefficiency', 'Not marking word endings', 'Wrong traversal'],
    keyPatterns: ['Prefix matching', 'Autocomplete', 'Word search', 'XOR tries'],
    mustKnowVariations: ['Standard trie', 'Compressed trie', 'Suffix trie'],
    interviewRelevance: 'Specialized but asked in specific problem types.',
    redFlags: ['Cannot implement basic trie', 'Not knowing when to use'],
    commonInterviewQuestions: ['Implement trie', 'Word search II', 'Design search autocomplete', 'Maximum XOR']
  },
  {
    id: 'backtracking',
    name: 'Backtracking',
    conceptSummary: 'Systematic exploration of all possibilities with pruning. Template-based approach.',
    prerequisites: ['Recursion', 'Trees'],
    commonMistakes: ['Not backtracking properly', 'Wrong base case', 'Missing pruning', 'Duplicate solutions'],
    keyPatterns: ['Subset generation', 'Permutations', 'Combinations', 'Constraint satisfaction'],
    mustKnowVariations: ['With/without duplicates', 'With constraints', 'Optimization backtracking'],
    interviewRelevance: 'Common pattern. Master the template.',
    redFlags: ['Cannot write backtracking template', 'Generating wrong solutions'],
    commonInterviewQuestions: ['N-Queens', 'Sudoku solver', 'Subsets', 'Combination sum']
  },
  {
    id: 'bit-manipulation',
    name: 'Bit Manipulation',
    conceptSummary: 'Operating directly on bits for optimization. O(1) operations for certain problems.',
    prerequisites: ['Binary number system', 'Basic operators'],
    commonMistakes: ['Signed/unsigned confusion', 'Overflow issues', 'Wrong bit operations'],
    keyPatterns: ['XOR tricks', 'Bit masking', 'Power of 2', 'Counting bits'],
    mustKnowVariations: ['Single number problems', 'Subsets using bits', 'Bit DP'],
    interviewRelevance: 'Niche but impressive when applicable.',
    redFlags: ['Cannot explain basic bit operations', 'Not knowing XOR properties'],
    commonInterviewQuestions: ['Single number', 'Counting bits', 'Power of two', 'Subsets using bitmask']
  }
];

// Helper function to create a problem
const p = (name: string, platform: 'LeetCode' | 'GeeksforGeeks' | 'Codeforces' | 'HackerRank' | 'CodeChef' | 'Other', difficulty: 'Easy' | 'Medium' | 'Hard', pattern: string, isRevision = false): RoadmapProblem => ({
  name, platform, difficulty, pattern, isRevision
});

// Month 1: Foundations (Weeks 1-4, Days 1-30)
const month1Weeks: WeekPlan[] = [
  {
    week: 1,
    title: 'Complexity Analysis & Array Fundamentals',
    focus: 'Build strong foundation with time complexity and basic array operations',
    interviewPattern: 'Always state time/space complexity before coding',
    weeklyGoal: 'Master Big O notation and solve 25+ array problems',
    confidenceScore: 0,
    milestone: 'Can analyze any code for time complexity',
    days: [
      {
        day: 1,
        topic: 'Time & Space Complexity',
        subtopics: ['Big O notation', 'Common complexities', 'Best/Worst/Average case'],
        concepts: ['O(1), O(log n), O(n), O(n log n), O(n²), O(2^n)', 'Space complexity basics', 'Analyzing loops'],
        problems: [
          p('Analyze loop complexity', 'GeeksforGeeks', 'Easy', 'Loop analysis'),
          p('Running Sum of 1d Array', 'LeetCode', 'Easy', 'Iteration'),
          p('Richest Customer Wealth', 'LeetCode', 'Easy', 'Nested loops'),
          p('Number of Good Pairs', 'LeetCode', 'Easy', 'Brute force analysis'),
          p('Kids With Greatest Candies', 'LeetCode', 'Easy', 'Linear scan')
        ],
        expectedOutcome: 'Understand Big O and analyze simple code complexity',
        timeEstimate: 120,
        status: 'not_started'
      },
      {
        day: 2,
        topic: 'Array Basics',
        subtopics: ['Array traversal', 'Basic operations', 'In-place modifications'],
        concepts: ['Index-based access', 'Forward/backward traversal', 'Swap operations'],
        problems: [
          p('Shuffle the Array', 'LeetCode', 'Easy', 'Array manipulation'),
          p('Concatenation of Array', 'LeetCode', 'Easy', 'Array building'),
          p('Build Array from Permutation', 'LeetCode', 'Easy', 'Index mapping'),
          p('Decompress Run-Length Encoded List', 'LeetCode', 'Easy', 'Decoding'),
          p('Count Items Matching a Rule', 'LeetCode', 'Easy', 'Filtering')
        ],
        expectedOutcome: 'Comfortable with array traversal and basic operations',
        timeEstimate: 120,
        status: 'not_started'
      },
      {
        day: 3,
        topic: 'Array - Finding Elements',
        subtopics: ['Linear search', 'Finding min/max', 'Existence checks'],
        concepts: ['Search algorithms', 'Tracking extremes', 'Early termination'],
        problems: [
          p('Find Numbers with Even Number of Digits', 'LeetCode', 'Easy', 'Digit counting'),
          p('Maximum Product of Two Elements', 'LeetCode', 'Easy', 'Finding max two'),
          p('Check If N and Its Double Exist', 'LeetCode', 'Easy', 'Search pattern'),
          p('Find the Highest Altitude', 'LeetCode', 'Easy', 'Prefix sum'),
          p('Largest Number At Least Twice of Others', 'LeetCode', 'Easy', 'Max tracking')
        ],
        expectedOutcome: 'Find elements efficiently using various techniques',
        timeEstimate: 120,
        status: 'not_started'
      },
      {
        day: 4,
        topic: 'Array - Modification & Transformation',
        subtopics: ['In-place modification', 'Array transformation', 'Removing elements'],
        concepts: ['Two-pointer for removal', 'Shifting elements', 'Overwriting'],
        problems: [
          p('Remove Element', 'LeetCode', 'Easy', 'Two pointers'),
          p('Remove Duplicates from Sorted Array', 'LeetCode', 'Easy', 'Two pointers'),
          p('Move Zeroes', 'LeetCode', 'Easy', 'Two pointers'),
          p('Squares of a Sorted Array', 'LeetCode', 'Easy', 'Two pointers'),
          p('Replace Elements with Greatest on Right', 'LeetCode', 'Easy', 'Right to left')
        ],
        expectedOutcome: 'Modify arrays in-place efficiently',
        timeEstimate: 150,
        status: 'not_started'
      },
      {
        day: 5,
        topic: 'Array - Prefix Sum',
        subtopics: ['Prefix sum concept', 'Range queries', 'Subarray sums'],
        concepts: ['Building prefix array', 'Query in O(1)', 'Difference arrays'],
        problems: [
          p('Running Sum of 1d Array', 'LeetCode', 'Easy', 'Prefix sum', true),
          p('Find Pivot Index', 'LeetCode', 'Easy', 'Prefix sum'),
          p('Range Sum Query - Immutable', 'LeetCode', 'Easy', 'Prefix sum'),
          p('Subarray Sum Equals K', 'LeetCode', 'Medium', 'Prefix sum + hash'),
          p('Contiguous Array', 'LeetCode', 'Medium', 'Prefix sum + hash')
        ],
        expectedOutcome: 'Use prefix sum for range query problems',
        timeEstimate: 150,
        status: 'not_started'
      },
      {
        day: 6,
        topic: 'Two Pointers - Basics',
        subtopics: ['Opposite direction pointers', 'Same direction pointers'],
        concepts: ['Pointer initialization', 'Movement conditions', 'Termination'],
        problems: [
          p('Two Sum II - Input Array Is Sorted', 'LeetCode', 'Medium', 'Two pointers'),
          p('Valid Palindrome', 'LeetCode', 'Easy', 'Two pointers'),
          p('Reverse String', 'LeetCode', 'Easy', 'Two pointers'),
          p('Merge Sorted Array', 'LeetCode', 'Easy', 'Two pointers'),
          p('Is Subsequence', 'LeetCode', 'Easy', 'Two pointers')
        ],
        expectedOutcome: 'Apply two pointer technique confidently',
        timeEstimate: 150,
        status: 'not_started'
      },
      {
        day: 7,
        topic: 'Week 1 Revision & Practice',
        subtopics: ['Review all concepts', 'Identify weak areas', 'Timed practice'],
        concepts: ['Complexity analysis review', 'Array patterns review', 'Two pointers review'],
        problems: [
          p('Best Time to Buy and Sell Stock', 'LeetCode', 'Easy', 'Array traversal'),
          p('Contains Duplicate', 'LeetCode', 'Easy', 'Hashing preview'),
          p('Maximum Subarray', 'LeetCode', 'Medium', 'Kadane preview'),
          p('3Sum', 'LeetCode', 'Medium', 'Two pointers'),
          p('Container With Most Water', 'LeetCode', 'Medium', 'Two pointers')
        ],
        expectedOutcome: 'Solidify week 1 concepts',
        timeEstimate: 180,
        status: 'not_started',
        isRevisionDay: true
      }
    ]
  },
  {
    week: 2,
    title: 'Hashing & String Fundamentals',
    focus: 'Master hash-based optimization and string manipulation',
    interviewPattern: 'Consider HashMap when you need O(1) lookup',
    weeklyGoal: 'Use hashing to optimize O(n²) to O(n)',
    confidenceScore: 0,
    days: [
      {
        day: 8,
        topic: 'HashMap Basics',
        subtopics: ['Hash function concept', 'Collision handling', 'HashMap operations'],
        concepts: ['Key-value storage', 'O(1) average operations', 'When to use HashMap'],
        problems: [
          p('Two Sum', 'LeetCode', 'Easy', 'HashMap lookup'),
          p('Valid Anagram', 'LeetCode', 'Easy', 'Frequency count'),
          p('First Unique Character in a String', 'LeetCode', 'Easy', 'Frequency count'),
          p('Ransom Note', 'LeetCode', 'Easy', 'Frequency count'),
          p('Jewels and Stones', 'LeetCode', 'Easy', 'HashSet')
        ],
        expectedOutcome: 'Use HashMap for O(1) lookups',
        timeEstimate: 120,
        status: 'not_started'
      },
      {
        day: 9,
        topic: 'HashMap - Frequency Problems',
        subtopics: ['Counting occurrences', 'Finding modes', 'Duplicate detection'],
        concepts: ['Frequency map pattern', 'Character counting', 'Element grouping'],
        problems: [
          p('Majority Element', 'LeetCode', 'Easy', 'Frequency count'),
          p('Find All Numbers Disappeared in an Array', 'LeetCode', 'Easy', 'Index as hash'),
          p('Single Number', 'LeetCode', 'Easy', 'XOR or HashMap'),
          p('Intersection of Two Arrays II', 'LeetCode', 'Easy', 'Frequency count'),
          p('Top K Frequent Elements', 'LeetCode', 'Medium', 'Frequency + sorting')
        ],
        expectedOutcome: 'Solve frequency-based problems efficiently',
        timeEstimate: 150,
        status: 'not_started'
      },
      {
        day: 10,
        topic: 'HashMap - Grouping & Mapping',
        subtopics: ['Group by key', 'Anagram grouping', 'Pattern mapping'],
        concepts: ['Creating group keys', 'Sorted string as key', 'Custom hash keys'],
        problems: [
          p('Group Anagrams', 'LeetCode', 'Medium', 'Grouping'),
          p('Isomorphic Strings', 'LeetCode', 'Easy', 'Mapping'),
          p('Word Pattern', 'LeetCode', 'Easy', 'Bijection'),
          p('Find and Replace Pattern', 'LeetCode', 'Medium', 'Pattern matching'),
          p('Two Sum', 'LeetCode', 'Easy', 'HashMap lookup', true)
        ],
        expectedOutcome: 'Group and map elements using HashMap',
        timeEstimate: 150,
        status: 'not_started'
      },
      {
        day: 11,
        topic: 'String Basics',
        subtopics: ['String traversal', 'Character operations', 'String building'],
        concepts: ['Immutability in strings', 'StringBuilder usage', 'Character to int'],
        problems: [
          p('Reverse String', 'LeetCode', 'Easy', 'Two pointers', true),
          p('Reverse Words in a String III', 'LeetCode', 'Easy', 'Word processing'),
          p('Valid Palindrome II', 'LeetCode', 'Easy', 'Two pointers'),
          p('Longest Common Prefix', 'LeetCode', 'Easy', 'Vertical scanning'),
          p('Implement strStr()', 'LeetCode', 'Easy', 'Substring search')
        ],
        expectedOutcome: 'Handle string manipulation problems',
        timeEstimate: 120,
        status: 'not_started'
      },
      {
        day: 12,
        topic: 'String - Pattern Problems',
        subtopics: ['Palindrome checking', 'Anagram detection', 'Substring problems'],
        concepts: ['Two pointer for palindrome', 'Character frequency', 'Window for substring'],
        problems: [
          p('Valid Palindrome', 'LeetCode', 'Easy', 'Two pointers', true),
          p('Palindrome Permutation', 'LeetCode', 'Easy', 'Frequency count'),
          p('Valid Anagram', 'LeetCode', 'Easy', 'Frequency count', true),
          p('Find All Anagrams in a String', 'LeetCode', 'Medium', 'Sliding window'),
          p('Longest Palindromic Substring', 'LeetCode', 'Medium', 'Expand from center')
        ],
        expectedOutcome: 'Identify and solve string pattern problems',
        timeEstimate: 150,
        status: 'not_started'
      },
      {
        day: 13,
        topic: 'Sliding Window - Fixed Size',
        subtopics: ['Window initialization', 'Sliding technique', 'Window updates'],
        concepts: ['Add new element, remove old', 'Maintaining window state', 'Maximum in window'],
        problems: [
          p('Maximum Average Subarray I', 'LeetCode', 'Easy', 'Fixed window'),
          p('Find All Anagrams in a String', 'LeetCode', 'Medium', 'Fixed window', true),
          p('Permutation in String', 'LeetCode', 'Medium', 'Fixed window'),
          p('Maximum Sum of Distinct Subarrays With Length K', 'LeetCode', 'Medium', 'Fixed window'),
          p('Sliding Window Maximum', 'LeetCode', 'Hard', 'Monotonic deque')
        ],
        expectedOutcome: 'Apply fixed-size sliding window',
        timeEstimate: 150,
        status: 'not_started'
      },
      {
        day: 14,
        topic: 'Week 2 Revision & Practice',
        subtopics: ['Hash problems review', 'String problems review', 'Sliding window review'],
        concepts: ['When to use HashMap', 'String optimization', 'Window patterns'],
        problems: [
          p('Longest Substring Without Repeating Characters', 'LeetCode', 'Medium', 'Variable window'),
          p('Minimum Window Substring', 'LeetCode', 'Hard', 'Variable window'),
          p('Group Anagrams', 'LeetCode', 'Medium', 'Grouping', true),
          p('Subarray Sum Equals K', 'LeetCode', 'Medium', 'Prefix + hash', true),
          p('Longest Consecutive Sequence', 'LeetCode', 'Medium', 'HashSet')
        ],
        expectedOutcome: 'Solidify week 2 concepts',
        timeEstimate: 180,
        status: 'not_started',
        isRevisionDay: true
      }
    ]
  },
  {
    week: 3,
    title: 'Recursion & Sorting',
    focus: 'Master recursive thinking and sorting algorithms',
    interviewPattern: 'Always identify base case first in recursion',
    weeklyGoal: 'Write recursive solutions naturally and understand sorting trade-offs',
    confidenceScore: 0,
    days: [
      {
        day: 15,
        topic: 'Recursion Fundamentals',
        subtopics: ['Base case identification', 'Recursive calls', 'Call stack'],
        concepts: ['Recursive thinking', 'Stack frames', 'Return values'],
        problems: [
          p('Power of Two', 'LeetCode', 'Easy', 'Basic recursion'),
          p('Fibonacci Number', 'LeetCode', 'Easy', 'Basic recursion'),
          p('Climbing Stairs', 'LeetCode', 'Easy', 'Recursion with memo'),
          p('Reverse String', 'LeetCode', 'Easy', 'Recursion'),
          p('Pow(x, n)', 'LeetCode', 'Medium', 'Divide and conquer')
        ],
        expectedOutcome: 'Write basic recursive functions',
        timeEstimate: 150,
        status: 'not_started'
      },
      {
        day: 16,
        topic: 'Recursion - Array Problems',
        subtopics: ['Array recursion patterns', 'Subarray generation', 'Index tracking'],
        concepts: ['Processing arrays recursively', 'Include/exclude pattern', 'Subsequences'],
        problems: [
          p('Sum of Array', 'GeeksforGeeks', 'Easy', 'Array recursion'),
          p('Print Array Recursively', 'GeeksforGeeks', 'Easy', 'Array recursion'),
          p('Print all Subsequences', 'GeeksforGeeks', 'Easy', 'Include/exclude'),
          p('Subset Sum', 'GeeksforGeeks', 'Easy', 'Include/exclude'),
          p('Subsets', 'LeetCode', 'Medium', 'Include/exclude')
        ],
        expectedOutcome: 'Apply recursion to array problems',
        timeEstimate: 150,
        status: 'not_started'
      },
      {
        day: 17,
        topic: 'Sorting - Basic Algorithms',
        subtopics: ['Bubble sort', 'Selection sort', 'Insertion sort'],
        concepts: ['Comparison-based sorting', 'In-place sorting', 'Stable vs unstable'],
        problems: [
          p('Sort an Array (Bubble)', 'GeeksforGeeks', 'Easy', 'Bubble sort'),
          p('Sort an Array (Selection)', 'GeeksforGeeks', 'Easy', 'Selection sort'),
          p('Sort an Array (Insertion)', 'GeeksforGeeks', 'Easy', 'Insertion sort'),
          p('Sort Colors', 'LeetCode', 'Medium', 'Dutch flag'),
          p('Relative Sort Array', 'LeetCode', 'Easy', 'Custom sort')
        ],
        expectedOutcome: 'Implement basic sorting algorithms',
        timeEstimate: 150,
        status: 'not_started'
      },
      {
        day: 18,
        topic: 'Merge Sort',
        subtopics: ['Divide and conquer', 'Merge operation', 'Complexity analysis'],
        concepts: ['Splitting arrays', 'Merging sorted arrays', 'O(n log n) guarantee'],
        problems: [
          p('Sort an Array', 'LeetCode', 'Medium', 'Merge sort'),
          p('Merge Sorted Array', 'LeetCode', 'Easy', 'Merge operation', true),
          p('Sort List', 'LeetCode', 'Medium', 'Merge sort on linked list'),
          p('Count of Smaller Numbers After Self', 'LeetCode', 'Hard', 'Modified merge sort'),
          p('Reverse Pairs', 'LeetCode', 'Hard', 'Modified merge sort')
        ],
        expectedOutcome: 'Implement merge sort and its variations',
        timeEstimate: 180,
        status: 'not_started'
      },
      {
        day: 19,
        topic: 'Quick Sort & Quick Select',
        subtopics: ['Partitioning', 'Pivot selection', 'Quick select for Kth element'],
        concepts: ['Lomuto partition', 'Hoare partition', 'Average O(n log n)'],
        problems: [
          p('Sort an Array', 'LeetCode', 'Medium', 'Quick sort'),
          p('Kth Largest Element in an Array', 'LeetCode', 'Medium', 'Quick select'),
          p('Wiggle Sort II', 'LeetCode', 'Medium', 'Partition'),
          p('Sort Colors', 'LeetCode', 'Medium', 'Dutch flag', true),
          p('Top K Frequent Elements', 'LeetCode', 'Medium', 'Quick select')
        ],
        expectedOutcome: 'Implement quick sort and quick select',
        timeEstimate: 180,
        status: 'not_started'
      },
      {
        day: 20,
        topic: 'Sorting Applications',
        subtopics: ['Custom comparators', 'Sorting with constraints', 'Counting sort'],
        concepts: ['Lambda comparators', 'Sorting objects', 'Non-comparison sorting'],
        problems: [
          p('Merge Intervals', 'LeetCode', 'Medium', 'Sort + merge'),
          p('Meeting Rooms', 'LeetCode', 'Easy', 'Sort + check'),
          p('Meeting Rooms II', 'LeetCode', 'Medium', 'Sort + heap'),
          p('Largest Number', 'LeetCode', 'Medium', 'Custom comparator'),
          p('H-Index', 'LeetCode', 'Medium', 'Counting sort')
        ],
        expectedOutcome: 'Apply sorting to solve complex problems',
        timeEstimate: 150,
        status: 'not_started'
      },
      {
        day: 21,
        topic: 'Week 3 Revision & Practice',
        subtopics: ['Recursion review', 'Sorting review', 'Combined problems'],
        concepts: ['Recursive patterns', 'Sorting trade-offs', 'Problem identification'],
        problems: [
          p('Subsets', 'LeetCode', 'Medium', 'Recursion', true),
          p('Subsets II', 'LeetCode', 'Medium', 'Recursion + duplicates'),
          p('Merge Intervals', 'LeetCode', 'Medium', 'Sort + merge', true),
          p('Insert Interval', 'LeetCode', 'Medium', 'Interval'),
          p('Non-overlapping Intervals', 'LeetCode', 'Medium', 'Greedy + sort')
        ],
        expectedOutcome: 'Solidify week 3 concepts',
        timeEstimate: 180,
        status: 'not_started',
        isRevisionDay: true
      }
    ]
  },
  {
    week: 4,
    title: 'Binary Search Mastery',
    focus: 'Master binary search and its variations',
    interviewPattern: 'When you see sorted or monotonic, think binary search',
    weeklyGoal: 'Apply binary search to various problem types',
    confidenceScore: 0,
    milestone: 'Month 1 Complete - Foundation Solid',
    days: [
      {
        day: 22,
        topic: 'Binary Search - Basics',
        subtopics: ['Standard binary search', 'Iterative vs recursive', 'Edge cases'],
        concepts: ['Mid calculation', 'Search space reduction', 'Termination condition'],
        problems: [
          p('Binary Search', 'LeetCode', 'Easy', 'Standard BS'),
          p('Guess Number Higher or Lower', 'LeetCode', 'Easy', 'Standard BS'),
          p('Search Insert Position', 'LeetCode', 'Easy', 'Lower bound'),
          p('First Bad Version', 'LeetCode', 'Easy', 'First occurrence'),
          p('Sqrt(x)', 'LeetCode', 'Easy', 'Binary search')
        ],
        expectedOutcome: 'Implement standard binary search flawlessly',
        timeEstimate: 120,
        status: 'not_started'
      },
      {
        day: 23,
        topic: 'Binary Search - Bounds',
        subtopics: ['Lower bound', 'Upper bound', 'First/Last occurrence'],
        concepts: ['Finding leftmost', 'Finding rightmost', 'Counting occurrences'],
        problems: [
          p('Find First and Last Position of Element', 'LeetCode', 'Medium', 'Bounds'),
          p('Count of an Element in a Sorted Array', 'GeeksforGeeks', 'Easy', 'Bounds'),
          p('Search a 2D Matrix', 'LeetCode', 'Medium', 'Binary search'),
          p('Search a 2D Matrix II', 'LeetCode', 'Medium', 'Staircase search'),
          p('Find Minimum in Rotated Sorted Array', 'LeetCode', 'Medium', 'Modified BS')
        ],
        expectedOutcome: 'Find bounds efficiently',
        timeEstimate: 150,
        status: 'not_started'
      },
      {
        day: 24,
        topic: 'Binary Search - Rotated Arrays',
        subtopics: ['Rotated sorted array', 'Finding pivot', 'Search in rotated'],
        concepts: ['Identifying sorted half', 'Handling duplicates', 'Pivot finding'],
        problems: [
          p('Search in Rotated Sorted Array', 'LeetCode', 'Medium', 'Rotated BS'),
          p('Search in Rotated Sorted Array II', 'LeetCode', 'Medium', 'With duplicates'),
          p('Find Minimum in Rotated Sorted Array', 'LeetCode', 'Medium', 'Find pivot', true),
          p('Find Minimum in Rotated Sorted Array II', 'LeetCode', 'Hard', 'With duplicates'),
          p('Rotation Count in Rotated Sorted Array', 'GeeksforGeeks', 'Easy', 'Find pivot')
        ],
        expectedOutcome: 'Handle rotated array problems',
        timeEstimate: 150,
        status: 'not_started'
      },
      {
        day: 25,
        topic: 'Binary Search on Answer',
        subtopics: ['Search space on answer', 'Feasibility check', 'Minimize/Maximize'],
        concepts: ['Defining search space', 'Writing check function', 'Optimal answer'],
        problems: [
          p('Koko Eating Bananas', 'LeetCode', 'Medium', 'Search on answer'),
          p('Capacity To Ship Packages', 'LeetCode', 'Medium', 'Search on answer'),
          p('Split Array Largest Sum', 'LeetCode', 'Hard', 'Search on answer'),
          p('Minimum Number of Days to Make m Bouquets', 'LeetCode', 'Medium', 'Search on answer'),
          p('Aggressive Cows', 'GeeksforGeeks', 'Medium', 'Search on answer')
        ],
        expectedOutcome: 'Apply binary search on answer space',
        timeEstimate: 180,
        status: 'not_started'
      },
      {
        day: 26,
        topic: 'Binary Search - Advanced',
        subtopics: ['Peak finding', 'Bitonic arrays', 'Advanced applications'],
        concepts: ['Local maxima/minima', 'Ternary search', 'Matrix binary search'],
        problems: [
          p('Find Peak Element', 'LeetCode', 'Medium', 'Peak finding'),
          p('Peak Index in a Mountain Array', 'LeetCode', 'Medium', 'Peak finding'),
          p('Find in Mountain Array', 'LeetCode', 'Hard', 'Peak + BS'),
          p('Median of Two Sorted Arrays', 'LeetCode', 'Hard', 'Binary search'),
          p('Find K Closest Elements', 'LeetCode', 'Medium', 'Binary search')
        ],
        expectedOutcome: 'Solve advanced binary search problems',
        timeEstimate: 180,
        status: 'not_started'
      },
      {
        day: 27,
        topic: 'Buffer Day - Catch Up',
        subtopics: ['Review weak areas', 'Practice pending problems', 'Concept clarification'],
        concepts: ['Fill gaps from week 1-4', 'Strengthen weak topics'],
        problems: [
          p('Problems from weak areas', 'LeetCode', 'Medium', 'Review'),
          p('Redo failed problems', 'LeetCode', 'Medium', 'Review'),
          p('Practice timed problems', 'LeetCode', 'Medium', 'Speed practice')
        ],
        expectedOutcome: 'No pending concepts from Month 1',
        timeEstimate: 180,
        status: 'not_started',
        isBufferDay: true
      },
      {
        day: 28,
        topic: 'Month 1 Revision',
        subtopics: ['All Month 1 topics', 'Pattern identification', 'Speed practice'],
        concepts: ['Arrays', 'Hashing', 'Strings', 'Two pointers', 'Binary search'],
        problems: [
          p('Best Time to Buy and Sell Stock', 'LeetCode', 'Easy', 'Review', true),
          p('Two Sum', 'LeetCode', 'Easy', 'Review', true),
          p('3Sum', 'LeetCode', 'Medium', 'Review', true),
          p('Search in Rotated Sorted Array', 'LeetCode', 'Medium', 'Review', true),
          p('Longest Substring Without Repeating Characters', 'LeetCode', 'Medium', 'Review', true)
        ],
        expectedOutcome: 'Month 1 concepts solidified',
        timeEstimate: 180,
        status: 'not_started',
        isRevisionDay: true
      },
      {
        day: 29,
        topic: 'Mock Interview Day 1',
        subtopics: ['Timed problem solving', 'Communication practice', 'Edge case handling'],
        concepts: ['Interview simulation', 'Thinking out loud', 'Time management'],
        problems: [
          p('Product of Array Except Self', 'LeetCode', 'Medium', 'Interview'),
          p('Container With Most Water', 'LeetCode', 'Medium', 'Interview'),
          p('Find First and Last Position', 'LeetCode', 'Medium', 'Interview')
        ],
        expectedOutcome: 'Experience interview pressure',
        timeEstimate: 120,
        status: 'not_started',
        isMockInterview: true
      },
      {
        day: 30,
        topic: 'Week 4 Revision & Assessment',
        subtopics: ['Binary search mastery check', 'Month 1 assessment', 'Plan Month 2'],
        concepts: ['Self-assessment', 'Identify gaps', 'Goal setting'],
        problems: [
          p('Random BS problem', 'LeetCode', 'Medium', 'Assessment'),
          p('Random Array problem', 'LeetCode', 'Medium', 'Assessment'),
          p('Random String problem', 'LeetCode', 'Medium', 'Assessment')
        ],
        expectedOutcome: 'Ready for Month 2',
        timeEstimate: 150,
        status: 'not_started',
        isRevisionDay: true
      }
    ]
  }
];

// Continue in roadmap-month2.ts and roadmap-month3.ts due to size
export { month1Weeks };
