'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type SaveStatus = 'idle' | 'saving' | 'saved';

type SetState<T> = (value: T | ((prev: T) => T)) => void;

/**
 * Persist game state to localStorage with a "Saved" status for UI reassurance.
 *
 * - SSR-safe: hydrates from localStorage on mount, not during render.
 * - Debounced writes so rapid updates coalesce into a single save.
 * - Forks: prefix keys to avoid collisions, e.g. `myGame:daily:2026-04-21`.
 */
export function useGameState<T>(
  key: string,
  initial: T,
  options: { debounceMs?: number } = {}
): [T, SetState<T>, SaveStatus] {
  const { debounceMs = 150 } = options;
  const [state, setState] = useState<T>(initial);
  const [status, setStatus] = useState<SaveStatus>('idle');
  const hydratedRef = useRef(false);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const writeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setState(JSON.parse(raw) as T);
    } catch {
      // Ignore: private mode, quota, or malformed JSON.
    }
    hydratedRef.current = true;
  }, [key]);

  useEffect(() => {
    if (!hydratedRef.current) return;
    setStatus('saving');
    if (writeTimerRef.current) clearTimeout(writeTimerRef.current);
    writeTimerRef.current = setTimeout(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(state));
        setStatus('saved');
        if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
        savedTimerRef.current = setTimeout(() => setStatus('idle'), 1200);
      } catch {
        setStatus('idle');
      }
    }, debounceMs);
    return () => {
      if (writeTimerRef.current) clearTimeout(writeTimerRef.current);
    };
  }, [key, state, debounceMs]);

  const set: SetState<T> = useCallback((value) => {
    setState((prev) =>
      typeof value === 'function' ? (value as (p: T) => T)(prev) : value
    );
  }, []);

  return [state, set, status];
}
