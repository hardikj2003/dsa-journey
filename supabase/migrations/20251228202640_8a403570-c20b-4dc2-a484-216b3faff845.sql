-- Create badge type enum
CREATE TYPE public.badge_type AS ENUM (
  'streak_7',
  'streak_30', 
  'streak_100',
  'streak_365',
  'problems_10',
  'problems_50',
  'problems_100',
  'problems_500',
  'first_problem',
  'roadmap_month_1',
  'roadmap_month_2',
  'roadmap_month_3',
  'roadmap_complete'
);

-- Create user_badges table
CREATE TABLE public.user_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  badge_type badge_type NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, badge_type)
);

-- Enable RLS
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own badges" 
ON public.user_badges 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own badges" 
ON public.user_badges 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX idx_user_badges_user_id ON public.user_badges(user_id);