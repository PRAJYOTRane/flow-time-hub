-- Sample data for development
-- This file inserts sample data for testing the application

-- Insert sample profiles (users)
INSERT INTO public.profiles (id, email, full_name, role) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'john@example.com', 'John Doe', 'admin'),
  ('550e8400-e29b-41d4-a716-446655440001', 'jane@example.com', 'Jane Smith', 'user'),
  ('550e8400-e29b-41d4-a716-446655440002', 'mike@example.com', 'Mike Johnson', 'user'),
  ('550e8400-e29b-41d4-a716-446655440003', 'sarah@example.com', 'Sarah Wilson', 'user');

-- Insert sample projects
INSERT INTO public.projects (id, name, description, status, priority, progress, start_date, end_date, budget, created_by) VALUES
  ('660e8400-e29b-41d4-a716-446655440000', 'Website Redesign', 'Complete overhaul of the company website with modern design and improved UX', 'active', 'high', 75, '2024-01-01', '2024-02-28', '$45,000', '550e8400-e29b-41d4-a716-446655440000'),
  ('660e8400-e29b-41d4-a716-446655440001', 'Mobile App Development', 'Native mobile application for iOS and Android platforms', 'active', 'high', 45, '2024-01-15', '2024-04-15', '$80,000', '550e8400-e29b-41d4-a716-446655440000'),
  ('660e8400-e29b-41d4-a716-446655440002', 'Marketing Campaign', 'Q1 digital marketing campaign for product launch', 'planning', 'medium', 10, '2024-02-01', '2024-03-31', '$25,000', '550e8400-e29b-41d4-a716-446655440001'),
  ('660e8400-e29b-41d4-a716-446655440003', 'Data Migration', 'Migrate legacy data to new system architecture', 'completed', 'medium', 100, '2023-11-01', '2023-12-15', '$15,000', '550e8400-e29b-41d4-a716-446655440002');

-- Insert project members
INSERT INTO public.project_members (project_id, user_id, role) VALUES
  ('660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 'project_manager'),
  ('660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001', 'designer'),
  ('660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440002', 'developer'),
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'project_manager'),
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'developer'),
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'qa_tester'),
  ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'project_manager'),
  ('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 'project_manager');

-- Insert sample tasks
INSERT INTO public.tasks (id, title, description, project_id, priority, status, assignee_id, due_date, estimated_hours, created_by) VALUES
  ('770e8400-e29b-41d4-a716-446655440000', 'Design landing page mockups', 'Create wireframes and high-fidelity mockups for the new landing page', '660e8400-e29b-41d4-a716-446655440000', 'high', 'in-progress', '550e8400-e29b-41d4-a716-446655440001', '2024-01-20', 16, '550e8400-e29b-41d4-a716-446655440000'),
  ('770e8400-e29b-41d4-a716-446655440001', 'Implement responsive navigation', 'Code the responsive navigation component with mobile menu', '660e8400-e29b-41d4-a716-446655440000', 'high', 'todo', '550e8400-e29b-41d4-a716-446655440002', '2024-01-25', 12, '550e8400-e29b-41d4-a716-446655440000'),
  ('770e8400-e29b-41d4-a716-446655440002', 'User authentication system', 'Implement login, signup, and password reset functionality', '660e8400-e29b-41d4-a716-446655440001', 'high', 'in-progress', '550e8400-e29b-41d4-a716-446655440002', '2024-02-05', 24, '550e8400-e29b-41d4-a716-446655440000'),
  ('770e8400-e29b-41d4-a716-446655440003', 'Content strategy planning', 'Develop content calendar and strategy for social media', '660e8400-e29b-41d4-a716-446655440002', 'medium', 'todo', '550e8400-e29b-41d4-a716-446655440001', '2024-02-10', 8, '550e8400-e29b-41d4-a716-446655440001'),
  ('770e8400-e29b-41d4-a716-446655440004', 'Database schema validation', 'Verify data integrity and relationships', '660e8400-e29b-41d4-a716-446655440003', 'low', 'completed', '550e8400-e29b-41d4-a716-446655440002', '2023-12-01', 6, '550e8400-e29b-41d4-a716-446655440002');

-- Insert sample time entries
INSERT INTO public.time_entries (task_id, user_id, description, start_time, end_time, duration_seconds, is_running) VALUES
  ('770e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001', 'Working on wireframes', '2024-01-15 09:00:00+00', '2024-01-15 12:00:00+00', 10800, false),
  ('770e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001', 'Creating high-fidelity mockups', '2024-01-16 13:00:00+00', '2024-01-16 17:00:00+00', 14400, false),
  ('770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Setting up authentication backend', '2024-01-20 10:00:00+00', '2024-01-20 15:30:00+00', 19800, false);
