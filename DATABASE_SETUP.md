# Database Setup Instructions

## Prerequisites
1. You need to have access to the Supabase project at: https://ojqbivaowhqotvllebvq.supabase.co
2. Install Supabase CLI: `npm install -g supabase`

## Setup Steps

### Option 1: Using Supabase Dashboard (Recommended)
1. Go to https://supabase.com/dashboard/project/ojqbivaowhqotvllebvq
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Run the query to create all tables
5. Copy and paste the contents of `supabase/migrations/002_sample_data.sql`
6. Run the query to insert sample data

### Option 2: Using Supabase CLI
1. Login to Supabase: `supabase login`
2. Link to the project: `supabase link --project-ref ojqbivaowhqotvllebvq`
3. Push migrations: `supabase db push`

## What this sets up:
- **Tables**: profiles, projects, project_members, tasks, time_entries, timesheets
- **Row Level Security**: Policies to ensure users can only access their own data
- **Sample Data**: Demo projects, tasks, and users for testing
- **Triggers**: Auto-update timestamps

## Authentication Setup
The app uses Supabase Auth. To test:
1. Go to Authentication > Users in Supabase Dashboard
2. Create a test user or use the sample users from the migration
3. The app will automatically create profile entries for new users

## Testing the Connection
1. Start the app: `npm run dev`
2. Navigate to /projects
3. You should see the sample projects loaded from the database
4. Try creating a new project to test the create functionality

## Notes
- The database is already configured with the correct connection details
- All hooks are ready to use the real database
- Row Level Security ensures data privacy between users
- Time tracking functionality is implemented with proper duration calculations
