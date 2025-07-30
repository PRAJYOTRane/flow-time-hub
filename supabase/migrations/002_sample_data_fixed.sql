-- Sample data for development (without auth dependencies)
-- This file inserts sample data for testing the application

-- First, let's create some projects without user dependencies
INSERT INTO public.projects (id, name, description, status, priority, progress, start_date, end_date, budget) VALUES
  ('660e8400-e29b-41d4-a716-446655440000', 'Website Redesign', 'Complete overhaul of the company website with modern design and improved UX', 'active', 'high', 75, '2024-01-01', '2024-02-28', '$45,000'),
  ('660e8400-e29b-41d4-a716-446655440001', 'Mobile App Development', 'Native mobile application for iOS and Android platforms', 'active', 'high', 45, '2024-01-15', '2024-04-15', '$80,000'),
  ('660e8400-e29b-41d4-a716-446655440002', 'Marketing Campaign', 'Q1 digital marketing campaign for product launch', 'planning', 'medium', 10, '2024-02-01', '2024-03-31', '$25,000'),
  ('660e8400-e29b-41d4-a716-446655440003', 'Data Migration', 'Migrate legacy data to new system architecture', 'completed', 'medium', 100, '2023-11-01', '2023-12-15', '$15,000');

-- Insert sample tasks without assignees for now
INSERT INTO public.tasks (id, title, description, project_id, priority, status, due_date, estimated_hours) VALUES
  ('770e8400-e29b-41d4-a716-446655440000', 'Design landing page mockups', 'Create wireframes and high-fidelity mockups for the new landing page', '660e8400-e29b-41d4-a716-446655440000', 'high', 'in-progress', '2024-01-20', 16),
  ('770e8400-e29b-41d4-a716-446655440001', 'Implement responsive navigation', 'Code the responsive navigation component with mobile menu', '660e8400-e29b-41d4-a716-446655440000', 'high', 'todo', '2024-01-25', 12),
  ('770e8400-e29b-41d4-a716-446655440002', 'User authentication system', 'Implement login, signup, and password reset functionality', '660e8400-e29b-41d4-a716-446655440001', 'high', 'in-progress', '2024-02-05', 24),
  ('770e8400-e29b-41d4-a716-446655440003', 'Content strategy planning', 'Develop content calendar and strategy for social media', '660e8400-e29b-41d4-a716-446655440002', 'medium', 'todo', '2024-02-10', 8),
  ('770e8400-e29b-41d4-a716-446655440004', 'Database schema validation', 'Verify data integrity and relationships', '660e8400-e29b-41d4-a716-446655440003', 'low', 'completed', '2023-12-01', 6),
  ('770e8400-e29b-41d4-a716-446655440005', 'API endpoint documentation', 'Create comprehensive API documentation for all endpoints', '660e8400-e29b-41d4-a716-446655440001', 'medium', 'todo', '2024-02-15', 8),
  ('770e8400-e29b-41d4-a716-446655440006', 'Performance optimization', 'Optimize database queries and frontend performance', '660e8400-e29b-41d4-a716-446655440000', 'medium', 'todo', '2024-02-20', 20),
  ('770e8400-e29b-41d4-a716-446655440007', 'Security audit', 'Conduct comprehensive security review and testing', '660e8400-e29b-41d4-a716-446655440001', 'high', 'todo', '2024-03-01', 16);

-- Note: User profiles and project members will be created automatically when users sign up and join projects
-- The app is designed to handle this through the authentication flow
