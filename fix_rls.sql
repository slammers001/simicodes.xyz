-- Fix RLS policies for contact_submissions table

-- Option 1: Disable RLS entirely (easiest for testing)
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;

-- OR Option 2: Keep RLS but fix policies (more secure)
-- First, drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Only authenticated users can read contact submissions" ON contact_submissions;

-- Create better policies
CREATE POLICY "Enable insert for all users" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read for authenticated users only" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON contact_submissions
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON contact_submissions
  FOR DELETE USING (auth.role() = 'authenticated');

-- Check current policies
SELECT * FROM pg_policies WHERE tablename = 'contact_submissions';
