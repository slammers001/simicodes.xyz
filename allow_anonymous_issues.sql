-- Modify issues table to allow anonymous submissions

-- 1. Make user_id nullable (remove NOT NULL constraint)
ALTER TABLE issues ALTER COLUMN user_id DROP NOT NULL;

-- 2. Set a default value for user_id for anonymous submissions
ALTER TABLE issues ALTER COLUMN user_id SET DEFAULT NULL;

-- 3. Update existing NULL user_ids to a default system user if needed
-- (This is optional - only if you have existing NULL values)
UPDATE issues SET user_id = NULL WHERE user_id IS NULL;

-- 4. Optionally, add a check constraint to allow NULL user_id
ALTER TABLE issues DROP CONSTRAINT IF EXISTS issues_user_id_fkey;
-- Add the foreign key back but allow NULL values
ALTER TABLE issues ADD CONSTRAINT issues_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;

-- 5. Update RLS policy to allow anonymous inserts
DROP POLICY IF EXISTS "Anyone can insert issues" ON issues;
CREATE POLICY "Anyone can insert issues" ON issues
    FOR INSERT WITH CHECK (true);

-- 6. Make sure RLS is enabled
ALTER TABLE issues ENABLE ROW LEVEL SECURITY;
