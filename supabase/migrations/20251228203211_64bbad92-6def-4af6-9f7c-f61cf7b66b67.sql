-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Service can insert notifications" ON public.notifications;

-- Create a restrictive policy that only allows service_role to insert
-- Service role is used by edge functions and bypasses RLS by default,
-- but we add this for documentation. Regular users cannot insert notifications.
CREATE POLICY "Only service role can insert notifications" 
ON public.notifications 
FOR INSERT 
WITH CHECK (auth.role() = 'service_role');