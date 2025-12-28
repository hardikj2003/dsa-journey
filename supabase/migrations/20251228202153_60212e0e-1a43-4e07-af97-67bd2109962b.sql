-- Allow service role to insert notifications (for edge functions)
-- First drop the restrictive policy if it exists
DROP POLICY IF EXISTS "Service can insert notifications" ON public.notifications;

-- Create policy that allows inserts for authenticated users (service role bypasses RLS anyway)
CREATE POLICY "Service can insert notifications" 
ON public.notifications 
FOR INSERT 
WITH CHECK (true);