-- Issues Table for Simi's Portfolio
CREATE TABLE issues (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Optional: Add indexes for better performance
CREATE INDEX idx_issues_email ON issues(email);
CREATE INDEX idx_issues_created_at ON issues(created_at);

-- Optional: Add Row Level Security (RLS) policies
ALTER TABLE issues ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert issues (but not read them)
CREATE POLICY "Anyone can insert issues" ON issues
  FOR INSERT WITH CHECK (true);

-- Only allow authenticated users to read issues
CREATE POLICY "Only authenticated users can read issues" ON issues
  FOR SELECT USING (auth.role() = 'authenticated');
