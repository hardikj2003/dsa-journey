import { Code2, Flame, Menu, Moon, Sun, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { AddProblemDialog } from './AddProblemDialog';
import { useStore } from '@/store/useStore';

export function Header() {
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const streakData = useStore((state) => state.streakData);

  useEffect(() => {
    // Default to dark mode
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl gradient-primary">
              <Code2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold">DSA Tracker</h1>
              <p className="text-xs text-muted-foreground">Stay consistent, level up</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Problems
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Roadmap
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Analytics
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {streakData.currentStreak > 0 && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary">
                <Flame className="h-4 w-4" />
                <span className="text-sm font-semibold">{streakData.currentStreak}</span>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden sm:flex"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <AddProblemDialog />

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-2">
              <a href="#" className="px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-lg">
                Dashboard
              </a>
              <a href="#" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary rounded-lg">
                Problems
              </a>
              <a href="#" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary rounded-lg">
                Roadmap
              </a>
              <a href="#" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary rounded-lg">
                Analytics
              </a>
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
