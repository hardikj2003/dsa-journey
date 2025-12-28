import { useState } from 'react';
import { Plus, Clock, Code, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import type { Database } from '@/integrations/supabase/types';

type Platform = Database['public']['Enums']['platform_type'];
type Difficulty = Database['public']['Enums']['difficulty_level'];

const platforms: Platform[] = ['LeetCode', 'GeeksforGeeks', 'Codeforces', 'HackerRank', 'CodeChef', 'Other'];
const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];
const topics = [
  'Arrays', 'Strings', 'Hashing', 'Recursion', 'Sorting', 'Stack', 'Queue',
  'Linked List', 'Binary Search', 'Trees', 'Heaps', 'Greedy', 'Graphs',
  'Dynamic Programming', 'Tries', 'Backtracking', 'Sliding Window',
  'Two Pointers', 'Bit Manipulation', 'Math', 'Other'
];

export function AddProblemDialog() {
  const { addProblem } = useSupabaseData();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    platform: 'LeetCode' as Platform,
    difficulty: 'Medium' as Difficulty,
    topic: 'Arrays',
    time_spent: 30,
    notes: '',
    code_snippet: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      return;
    }

    setLoading(true);
    
    await addProblem({
      name: formData.name,
      platform: formData.platform,
      difficulty: formData.difficulty,
      topic: formData.topic,
      time_spent: formData.time_spent,
      notes: formData.notes || null,
      code_snippet: formData.code_snippet || null,
      date: new Date().toISOString().split('T')[0],
      is_bookmarked: false,
      tags: []
    });

    setFormData({
      name: '',
      platform: 'LeetCode',
      difficulty: 'Medium',
      topic: 'Arrays',
      time_spent: 30,
      notes: '',
      code_snippet: ''
    });
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="gradient" size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Log Problem
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Log a Problem</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Problem Name</Label>
            <Input
              id="name"
              placeholder="e.g., Two Sum"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Platform</Label>
              <Select
                value={formData.platform}
                onValueChange={(value: Platform) => setFormData({ ...formData, platform: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value: Difficulty) => setFormData({ ...formData, difficulty: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Topic</Label>
              <Select
                value={formData.topic}
                onValueChange={(value) => setFormData({ ...formData, topic: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time_spent" className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> Time (min)
              </Label>
              <Input
                id="time_spent"
                type="number"
                min={1}
                value={formData.time_spent}
                onChange={(e) => setFormData({ ...formData, time_spent: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="flex items-center gap-1">
              <FileText className="h-3 w-3" /> Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="Key insights, approach used, mistakes made..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="code" className="flex items-center gap-1">
              <Code className="h-3 w-3" /> Code Snippet (optional)
            </Label>
            <Textarea
              id="code"
              placeholder="Paste your solution here..."
              value={formData.code_snippet}
              onChange={(e) => setFormData({ ...formData, code_snippet: e.target.value })}
              rows={4}
              className="font-mono text-sm"
            />
          </div>

          <Button type="submit" className="w-full" variant="gradient" disabled={loading}>
            {loading ? 'Saving...' : 'Save Problem'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
