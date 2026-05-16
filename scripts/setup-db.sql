-- Run this SQL in your Supabase SQL Editor (https://supabase.com/dashboard/project/nftqugmegwbhnaiaicob/sql)

CREATE TABLE IF NOT EXISTS runs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  distance_meters REAL NOT NULL,
  duration_seconds INTEGER NOT NULL,
  pace TEXT,
  calories INTEGER,
  avg_speed REAL,
  positions JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert runs" ON runs FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read runs" ON runs FOR SELECT USING (true);
