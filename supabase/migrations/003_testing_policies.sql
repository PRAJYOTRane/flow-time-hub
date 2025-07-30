-- Update RLS policies for initial testing without authentication
-- Run this after the main schema to allow public access for testing

-- Temporarily allow public read access to projects for testing
DROP POLICY IF EXISTS "Users can view projects they're members of" ON public.projects;
DROP POLICY IF EXISTS "Allow public read access to projects" ON public.projects;
CREATE POLICY "Allow public read access to projects" ON public.projects
  FOR SELECT USING (true);

-- Allow public read access to tasks for testing  
DROP POLICY IF EXISTS "Users can view tasks in their projects" ON public.tasks;
DROP POLICY IF EXISTS "Allow public read access to tasks" ON public.tasks;
CREATE POLICY "Allow public read access to tasks" ON public.tasks
  FOR SELECT USING (true);

-- Allow public insert access to tasks for testing
DROP POLICY IF EXISTS "Users can create tasks in their projects" ON public.tasks;
DROP POLICY IF EXISTS "Allow public insert access to tasks" ON public.tasks;
CREATE POLICY "Allow public insert access to tasks" ON public.tasks
  FOR INSERT WITH CHECK (true);

-- Allow public insert access to projects for testing
DROP POLICY IF EXISTS "Users can create projects" ON public.projects;
DROP POLICY IF EXISTS "Allow public insert access to projects" ON public.projects;
CREATE POLICY "Allow public insert access to projects" ON public.projects
  FOR INSERT WITH CHECK (true);

-- Note: In production, you should replace these with proper user-based policies
-- after implementing authentication
