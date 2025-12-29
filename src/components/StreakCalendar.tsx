import { useMemo } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useSupabaseData } from '@/hooks/useSupabaseData';

interface StreakCalendarProps {
  days?: number;
}

export function StreakCalendar({ days = 365 }: StreakCalendarProps) {
  const { getActivityCalendar } = useSupabaseData();
  
  const calendarData = useMemo(() => getActivityCalendar(days), [getActivityCalendar, days]);
  
  const getHeatmapClass = (count: number) => {
    if (count === 0) return 'heatmap-0';
    if (count === 1) return 'heatmap-1';
    if (count === 2) return 'heatmap-2';
    if (count <= 4) return 'heatmap-3';
    return 'heatmap-4';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Group by weeks for the grid layout and calculate month positions
  const { weeks, monthLabels } = useMemo(() => {
    const result: { date: string; count: number }[][] = [];
    let currentWeek: { date: string; count: number }[] = [];
    
    const firstDate = new Date(calendarData[0]?.date || new Date());
    const firstDayOfWeek = firstDate.getDay();
    
    // Pad the first week
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push({ date: '', count: -1 });
    }
    
    calendarData.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        result.push(currentWeek);
        currentWeek = [];
      }
    });
    
    if (currentWeek.length > 0) {
      result.push(currentWeek);
    }
    
    // Calculate month labels with their week positions
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const labels: { month: string; weekIndex: number }[] = [];
    let lastMonth = -1;
    
    result.forEach((week, weekIndex) => {
      const firstValidDay = week.find(d => d.count !== -1 && d.date);
      if (firstValidDay) {
        const date = new Date(firstValidDay.date);
        const month = date.getMonth();
        if (month !== lastMonth) {
          labels.push({ month: months[month], weekIndex });
          lastMonth = month;
        }
      }
    });
    
    return { weeks: result, monthLabels: labels };
  }, [calendarData]);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="min-w-fit">
        {/* Month labels positioned above their actual weeks */}
        <div className="flex mb-1 pl-8 relative h-4">
          {monthLabels.map((label, i) => (
            <span 
              key={i} 
              className="text-xs text-muted-foreground absolute"
              style={{ left: `calc(32px + ${label.weekIndex * 14}px)` }}
            >
              {label.month}
            </span>
          ))}
        </div>
        
        <div className="flex gap-0.5">
          <div className="flex flex-col gap-0.5 pr-1">
            {weekDays.map((day, i) => (
              <span key={i} className="text-[10px] text-muted-foreground h-3 flex items-center">
                {i % 2 === 1 ? day : ''}
              </span>
            ))}
          </div>
          
          <div className="flex gap-0.5">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-0.5">
                {week.map((day, dayIndex) => (
                  day.count === -1 ? (
                    <div key={dayIndex} className="w-3 h-3" />
                  ) : (
                    <Tooltip key={dayIndex}>
                      <TooltipTrigger asChild>
                        <div
                          className={`w-3 h-3 rounded-sm ${getHeatmapClass(day.count)} transition-all hover:ring-1 hover:ring-foreground/20 cursor-pointer`}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        <p className="font-medium">{formatDate(day.date)}</p>
                        <p className="text-muted-foreground">
                          {day.count === 0 ? 'No problems' : `${day.count} problem${day.count > 1 ? 's' : ''}`}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  )
                ))}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-2 mt-2">
          <span className="text-xs text-muted-foreground">Less</span>
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((level) => (
              <div key={level} className={`w-3 h-3 rounded-sm heatmap-${level}`} />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">More</span>
        </div>
      </div>
    </div>
  );
}
