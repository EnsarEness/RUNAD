"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export type Challenge = {
  id: string;
  title: string;
  description: string | null;
  creator_wallet: string;
  challenge_type: string;
  target_value: number | null;
  entry_fee: number;
  start_date: string;
  end_date: string;
  location: string | null;
  level: string;
  max_participants: number;
  reward: string | null;
  created_at: string;
  participant_count?: number;
};

type CreateChallengeInput = {
  title: string;
  description?: string;
  creatorWallet: string;
  challengeType: string;
  targetValue?: number;
  startDate: string;
  endDate: string;
  location?: string;
  level: string;
  maxParticipants: number;
  reward?: string;
};

export function useChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChallenges = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from("challenges")
      .select("*")
      .order("created_at", { ascending: false });

    if (err) {
      setError(err.message);
    } else {
      const challengesWithCounts = await Promise.all(
        (data ?? []).map(async (c: Challenge) => {
          const { count } = await supabase
            .from("challenge_participants")
            .select("*", { count: "exact", head: true })
            .eq("challenge_id", c.id);
          return { ...c, participant_count: count ?? 0 };
        })
      );
      setChallenges(challengesWithCounts);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  const createChallenge = async (input: CreateChallengeInput) => {
    const { data, error: err } = await supabase
      .from("challenges")
      .insert({
        title: input.title,
        description: input.description ?? null,
        creator_wallet: input.creatorWallet,
        challenge_type: input.challengeType,
        target_value: input.targetValue ?? null,
        start_date: input.startDate,
        end_date: input.endDate,
        location: input.location ?? null,
        level: input.level,
        max_participants: input.maxParticipants,
        reward: input.reward ?? null,
      })
      .select()
      .single();

    if (err) throw err;
    await fetchChallenges();
    return data;
  };

  const joinChallenge = async (challengeId: string, walletAddress: string) => {
    const { error: err } = await supabase
      .from("challenge_participants")
      .insert({
        challenge_id: challengeId,
        wallet_address: walletAddress,
      });

    if (err) {
      if (err.code === "23505") throw new Error("Already joined");
      throw err;
    }
    await fetchChallenges();
  };

  return {
    challenges,
    loading,
    error,
    createChallenge,
    joinChallenge,
    refresh: fetchChallenges,
  };
}
