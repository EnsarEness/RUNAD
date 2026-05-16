import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST() {
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { error } = await supabase.from("runs").select("id").limit(1);

  if (error && error.code === "PGRST205") {
    return NextResponse.json(
      {
        message: "Table 'runs' does not exist. Please create it in the Supabase SQL Editor.",
        sql: `CREATE TABLE IF NOT EXISTS runs (
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
CREATE POLICY "Anyone can read runs" ON runs FOR SELECT USING (true);`,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Table 'runs' exists and is ready." });
}
