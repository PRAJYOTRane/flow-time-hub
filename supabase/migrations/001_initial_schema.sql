-- Enable RLS (Row Level Security)
-- This file creates the basic schema for the TaskFlow application

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('planning', 'active', 'on-hold', 'completed')) DEFAULT 'planning',
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  start_date DATE,
  end_date DATE,
  budget TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project members table
CREATE TABLE public.project_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

-- Tasks table
CREATE TABLE public.tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  parent_task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('todo', 'in-progress', 'completed')) DEFAULT 'todo',
  assignee_id UUID REFERENCES public.profiles(id),
  due_date DATE,
  estimated_hours DECIMAL,
  actual_hours DECIMAL DEFAULT 0,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Time tracking table
CREATE TABLE public.time_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  duration_seconds INTEGER,
  is_running BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Timesheets table
CREATE TABLE public.timesheets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL,
  total_hours DECIMAL DEFAULT 0,
  status TEXT CHECK (status IN ('draft', 'submitted', 'approved', 'rejected')) DEFAULT 'draft',
  submitted_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timesheets ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Projects policies
CREATE POLICY "Users can view projects they're members of" ON public.projects
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.project_members 
      WHERE project_id = projects.id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Project creators can manage their projects" ON public.projects
  FOR ALL USING (created_by = auth.uid());

-- Tasks policies
CREATE POLICY "Users can view tasks in their projects" ON public.tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.project_members pm
      JOIN public.projects p ON pm.project_id = p.id
      WHERE p.id = tasks.project_id AND pm.user_id = auth.uid()
    )
  );

-- Time entries policies
CREATE POLICY "Users can manage their own time entries" ON public.time_entries
  FOR ALL USING (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX idx_tasks_project_id ON public.tasks(project_id);
CREATE INDEX idx_tasks_assignee_id ON public.tasks(assignee_id);
CREATE INDEX idx_tasks_parent_task_id ON public.tasks(parent_task_id);
CREATE INDEX idx_time_entries_task_id ON public.time_entries(task_id);
CREATE INDEX idx_time_entries_user_id ON public.time_entries(user_id);
CREATE INDEX idx_project_members_project_id ON public.project_members(project_id);
CREATE INDEX idx_project_members_user_id ON public.project_members(user_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_time_entries_updated_at BEFORE UPDATE ON public.time_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_timesheets_updated_at BEFORE UPDATE ON public.timesheets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
