import { useState } from 'react';
import { Header } from '@/components/Header';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bookmark, BookmarkCheck, Search, Trash2, Clock, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const Problems = () => {
  const { problems, streakData, toggleBookmark, deleteProblem, loading } = useSupabaseData();
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [bookmarkFilter, setBookmarkFilter] = useState<string>('all');

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.name.toLowerCase().includes(search.toLowerCase()) ||
      problem.topic.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || problem.difficulty === difficultyFilter;
    const matchesPlatform = platformFilter === 'all' || problem.platform === platformFilter;
    const matchesBookmark = bookmarkFilter === 'all' || 
      (bookmarkFilter === 'bookmarked' && problem.is_bookmarked) ||
      (bookmarkFilter === 'not_bookmarked' && !problem.is_bookmarked);
    
    return matchesSearch && matchesDifficulty && matchesPlatform && matchesBookmark;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'easy';
      case 'Medium': return 'medium';
      case 'Hard': return 'hard';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl gradient-primary animate-bounce" />
          <p className="text-muted-foreground">Loading problems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentStreak={streakData.currentStreak} />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">
            All <span className="text-gradient">Problems</span>
          </h1>
          <p className="text-muted-foreground">
            {problems.length} problems logged • {filteredProblems.length} shown
          </p>
        </div>

        {/* Filters */}
        <Card variant="glass">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search problems or topics..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulty</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="LeetCode">LeetCode</SelectItem>
                  <SelectItem value="GeeksforGeeks">GeeksforGeeks</SelectItem>
                  <SelectItem value="Codeforces">Codeforces</SelectItem>
                  <SelectItem value="HackerRank">HackerRank</SelectItem>
                  <SelectItem value="CodeChef">CodeChef</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Select value={bookmarkFilter} onValueChange={setBookmarkFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Bookmarks" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="bookmarked">Bookmarked</SelectItem>
                  <SelectItem value="not_bookmarked">Not Bookmarked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Problems List */}
        <div className="space-y-3">
          {filteredProblems.length === 0 ? (
            <Card variant="glass">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No problems found matching your filters.</p>
              </CardContent>
            </Card>
          ) : (
            filteredProblems.map((problem) => (
              <Card key={problem.id} variant="glass" className="hover:border-primary/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <h3 className="font-semibold truncate">{problem.name}</h3>
                        <Badge variant={getDifficultyColor(problem.difficulty) as any}>
                          {problem.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {problem.platform}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Badge variant="topic">{problem.topic}</Badge>
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(problem.date), 'MMM d, yyyy')}
                        </span>
                        {problem.time_spent && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {problem.time_spent} min
                          </span>
                        )}
                      </div>
                      {problem.notes && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {problem.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleBookmark(problem.id)}
                        className={problem.is_bookmarked ? 'text-primary' : 'text-muted-foreground'}
                      >
                        {problem.is_bookmarked ? (
                          <BookmarkCheck className="h-4 w-4" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteProblem(problem.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Problems;
