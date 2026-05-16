-- Community Challenges / Events table
CREATE TABLE IF NOT EXISTS challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  creator_wallet TEXT NOT NULL,
  challenge_type TEXT NOT NULL DEFAULT 'distance', -- distance, time, streak
  target_value REAL, -- e.g. 50 (km)
  entry_fee REAL DEFAULT 0,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  location TEXT,
  level TEXT DEFAULT 'All Levels', -- All Levels, Beginner, Intermediate, Advanced
  max_participants INTEGER DEFAULT 50,
  reward TEXT, -- e.g. "NFT Badge", "0.5 MON"
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Challenge participants
CREATE TABLE IF NOT EXISTS challenge_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
  wallet_address TEXT NOT NULL,
  joined_at TIMESTAMPTZ DEFAULT now(),
  total_distance REAL DEFAULT 0,
  total_runs INTEGER DEFAULT 0,
  UNIQUE(challenge_id, wallet_address)
);

-- Row Level Security
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read challenges" ON challenges FOR SELECT USING (true);
CREATE POLICY "Anyone can create challenges" ON challenges FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update own challenges" ON challenges FOR UPDATE USING (true);

CREATE POLICY "Anyone can read participants" ON challenge_participants FOR SELECT USING (true);
CREATE POLICY "Anyone can join challenges" ON challenge_participants FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update own participation" ON challenge_participants FOR UPDATE USING (true);
