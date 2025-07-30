# 🚀 Quick Database Setup Guide

## Step 1: Open Supabase Dashboard
1. Go to: https://supabase.com/dashboard/project/ojqbivaowhqotvllebvq
2. Login with your Supabase account

## Step 2: Open SQL Editor
1. Click "SQL Editor" in the left sidebar
2. Click "New Query" button

## Step 3: Create Tables
1. Copy the entire content from `supabase/migrations/001_initial_schema.sql`
2. Paste it into the SQL editor
3. Click "Run" button
4. You should see "Success. No rows returned" message

## Step 4: Add Sample Data (Optional)
1. Create another new query
2. Copy the content from `supabase/migrations/002_sample_data.sql`
3. Paste and run it
4. You should see several rows inserted

## Step 5: Test the Connection
1. Go back to your app at http://localhost:8080/projects
2. You should now see projects loading from the database!

## Quick Verification
After running the schema, you can verify in Supabase:
1. Go to "Table Editor" in the dashboard
2. You should see these tables:
   - profiles
   - projects  
   - project_members
   - tasks
   - time_entries
   - timesheets

## Troubleshooting
- If you get permission errors, make sure you're logged into the correct Supabase account
- If tables already exist, you can drop them first with: `DROP TABLE IF EXISTS table_name CASCADE;`
- Check the browser console for any connection errors

That's it! Your database will be fully connected. 🎉
