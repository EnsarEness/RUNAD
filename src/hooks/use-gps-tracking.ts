"use client";

import { useState, useRef, useCallback, useEffect } from "react";

type LatLng = [number, number];

type TrackingState = "idle" | "tracking" | "paused" | "complete";

type RunStats = {
  distance: number; // meters
  duration: number; // seconds
  pace: string; // min/km
  calories: number;
  avgSpeed: number; // km/h
  positions: LatLng[];
  currentPosition: LatLng | null;
  startTime: number | null;
};

type GpsTracking = {
  state: TrackingState;
  stats: RunStats;
  error: string | null;
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  reset: () => void;
  hasPermission: boolean | null;
};

function haversineDistance(a: LatLng, b: LatLng): number {
  const R = 6371000;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const h =
    sinLat * sinLat +
    Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * sinLng * sinLng;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function formatPace(metersPerSecond: number): string {
  if (metersPerSecond <= 0) return "--:--";
  const paceSeconds = 1000 / metersPerSecond;
  const mins = Math.floor(paceSeconds / 60);
  const secs = Math.floor(paceSeconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function estimateCalories(distanceKm: number, durationMin: number): number {
  // ~60 cal/km for ~70kg runner
  return Math.round(distanceKm * 60);
}

const INITIAL_STATS: RunStats = {
  distance: 0,
  duration: 0,
  pace: "--:--",
  calories: 0,
  avgSpeed: 0,
  positions: [],
  currentPosition: null,
  startTime: null,
};

const MIN_ACCURACY = 100; // meters - accept less accurate GPS readings on mobile
const MIN_DISTANCE = 2; // meters - minimum movement to record

export function useGpsTracking(): GpsTracking {
  const [state, setState] = useState<TrackingState>("idle");
  const [stats, setStats] = useState<RunStats>(INITIAL_STATS);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const watchIdRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedDurationRef = useRef<number>(0);
  const pauseStartRef = useRef<number | null>(null);

  const clearWatch = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => {
      if (!startTimeRef.current) return;
      const elapsed =
        (Date.now() - startTimeRef.current - pausedDurationRef.current) / 1000;
      setStats((prev) => ({
        ...prev,
        duration: Math.floor(elapsed),
      }));
    }, 1000);
  }, [clearTimer]);

  const start = useCallback(() => {
    if (!navigator.geolocation) {
      setError("GPS desteklenmiyor");
      return;
    }

    setError(null);
    setState("tracking");
    startTimeRef.current = Date.now();
    pausedDurationRef.current = 0;

    setStats({
      ...INITIAL_STATS,
      startTime: Date.now(),
    });

    startTimer();

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        setHasPermission(true);
        const { latitude, longitude, accuracy } = position.coords;

        if (accuracy > MIN_ACCURACY) return;

        const newPos: LatLng = [latitude, longitude];

        setStats((prev) => {
          const prevPositions = prev.positions;
          const lastPos =
            prevPositions.length > 0
              ? prevPositions[prevPositions.length - 1]
              : null;

          if (lastPos) {
            const dist = haversineDistance(lastPos, newPos);
            if (dist < MIN_DISTANCE) {
              return { ...prev, currentPosition: newPos };
            }
          }

          const newPositions = [...prevPositions, newPos];
          const totalDistance = lastPos
            ? prev.distance + haversineDistance(lastPos, newPos)
            : prev.distance;

          const durationSec = prev.duration || 1;
          const speedMs = totalDistance / durationSec;
          const distanceKm = totalDistance / 1000;
          const durationMin = durationSec / 60;

          return {
            ...prev,
            positions: newPositions,
            currentPosition: newPos,
            distance: totalDistance,
            pace: formatPace(speedMs),
            avgSpeed: parseFloat(((distanceKm / durationMin) * 60).toFixed(1)),
            calories: estimateCalories(distanceKm, durationMin),
          };
        });
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setHasPermission(false);
          setError("Konum izni verilmedi. Lütfen ayarlardan izin verin.");
          setState("idle");
          clearWatch();
          clearTimer();
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setError("Konum alınamıyor. GPS sinyali zayıf.");
        } else if (err.code === err.TIMEOUT) {
          setError("GPS zaman aşımı. Tekrar deneyin.");
        }
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 30000,
      }
    );
  }, [startTimer, clearWatch, clearTimer]);

  const pause = useCallback(() => {
    setState("paused");
    clearWatch();
    clearTimer();
    pauseStartRef.current = Date.now();
  }, [clearWatch, clearTimer]);

  const resume = useCallback(() => {
    if (pauseStartRef.current) {
      pausedDurationRef.current += Date.now() - pauseStartRef.current;
      pauseStartRef.current = null;
    }
    setState("tracking");
    startTimer();

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        if (accuracy > MIN_ACCURACY) return;
        const newPos: LatLng = [latitude, longitude];

        setStats((prev) => {
          const lastPos =
            prev.positions.length > 0
              ? prev.positions[prev.positions.length - 1]
              : null;

          if (lastPos) {
            const dist = haversineDistance(lastPos, newPos);
            if (dist < MIN_DISTANCE) {
              return { ...prev, currentPosition: newPos };
            }
          }

          const newPositions = [...prev.positions, newPos];
          const totalDistance = lastPos
            ? prev.distance + haversineDistance(lastPos, newPos)
            : prev.distance;

          const durationSec = prev.duration || 1;
          const speedMs = totalDistance / durationSec;
          const distanceKm = totalDistance / 1000;
          const durationMin = durationSec / 60;

          return {
            ...prev,
            positions: newPositions,
            currentPosition: newPos,
            distance: totalDistance,
            pace: formatPace(speedMs),
            avgSpeed: parseFloat(((distanceKm / durationMin) * 60).toFixed(1)),
            calories: estimateCalories(distanceKm, durationMin),
          };
        });
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 30000 }
    );
  }, [startTimer]);

  const stop = useCallback(() => {
    setState("complete");
    clearWatch();
    clearTimer();
  }, [clearWatch, clearTimer]);

  const reset = useCallback(() => {
    setState("idle");
    clearWatch();
    clearTimer();
    setStats(INITIAL_STATS);
    setError(null);
    startTimeRef.current = null;
    pausedDurationRef.current = 0;
    pauseStartRef.current = null;
  }, [clearWatch, clearTimer]);

  useEffect(() => {
    return () => {
      clearWatch();
      clearTimer();
    };
  }, [clearWatch, clearTimer]);

  return {
    state,
    stats,
    error,
    start,
    pause,
    resume,
    stop,
    reset,
    hasPermission,
  };
}
