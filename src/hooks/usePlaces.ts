import { useCallback, useEffect, useState } from 'react';
import type { Place } from '../data/places';

const DRAFT_KEY = 'ashleys-sf-draft';

function loadDraft(): Place[] | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Place[]) : null;
  } catch {
    return null;
  }
}

/**
 * Published data lives in public/places.json (fetched at runtime so admin
 * commits show up after each deploy). A local draft in localStorage overlays
 * it while Ashley is editing, before she publishes.
 */
export function usePlaces() {
  const [published, setPublished] = useState<Place[] | null>(null);
  const [draft, setDraftState] = useState<Place[] | null>(loadDraft);

  useEffect(() => {
    let cancelled = false;
    fetch(`${import.meta.env.BASE_URL}places.json`)
      .then((r) => r.json())
      .then((data: Place[]) => {
        if (!cancelled) setPublished(data);
      })
      .catch(() => {
        if (!cancelled) setPublished([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const setDraft = useCallback((next: Place[] | null) => {
    setDraftState(next);
    try {
      if (next === null) localStorage.removeItem(DRAFT_KEY);
      else localStorage.setItem(DRAFT_KEY, JSON.stringify(next));
    } catch {
      // localStorage unavailable (private mode) — draft stays in memory only
    }
  }, []);

  const markPublished = useCallback(
    (places: Place[]) => {
      setPublished(places);
      setDraft(null);
    },
    [setDraft],
  );

  return {
    places: draft ?? published,
    loading: published === null && draft === null,
    hasDraft: draft !== null,
    setDraft,
    markPublished,
  };
}
