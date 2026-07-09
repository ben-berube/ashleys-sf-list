import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { FilterBar } from './components/FilterBar';
import { PlaceCard } from './components/PlaceCard';
import { AdminPanel } from './components/AdminPanel';
import { usePlaces } from './hooks/usePlaces';
import { CATEGORIES, type CategoryId } from './data/places';

const VISITED_KEY = 'ashleys-sf-visited';
const NO_PLACES: never[] = [];

function loadVisited(): Set<string> {
  try {
    const raw = localStorage.getItem(VISITED_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

export default function App() {
  const [active, setActive] = useState<CategoryId | 'all'>('all');
  const [query, setQuery] = useState('');
  const [visited, setVisited] = useState<Set<string>>(loadVisited);
  const [adminOpen, setAdminOpen] = useState(() => window.location.hash === '#admin');
  const flagTaps = useRef<number[]>([]);

  const { places, loading, hasDraft, setDraft, markPublished } = usePlaces();
  const allPlaces = places ?? NO_PLACES;

  useEffect(() => {
    const onHash = () => setAdminOpen(window.location.hash === '#admin');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const openAdmin = () => {
    window.location.hash = 'admin';
    setAdminOpen(true);
  };

  const closeAdmin = () => {
    if (window.location.hash === '#admin') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    setAdminOpen(false);
  };

  // Secret entrance: tap the flag in the footer five times within 3 seconds
  const onFlagTap = () => {
    const now = Date.now();
    flagTaps.current = [...flagTaps.current.filter((t) => now - t < 3000), now];
    if (flagTaps.current.length >= 5) {
      flagTaps.current = [];
      openAdmin();
    }
  };

  useEffect(() => {
    localStorage.setItem(VISITED_KEY, JSON.stringify([...visited]));
  }, [visited]);

  const toggleVisited = (id: string) => {
    setVisited((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: allPlaces.length };
    for (const cat of CATEGORIES) {
      c[cat.id] = allPlaces.filter((p) => p.categories.includes(cat.id)).length;
    }
    return c;
  }, [allPlaces]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allPlaces.filter((p) => {
      const matchesCategory = active === 'all' || p.categories.includes(active);
      const matchesQuery =
        q === '' ||
        p.name.toLowerCase().includes(q) ||
        (p.note ?? '').toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [allPlaces, active, query]);

  return (
    <div className="app">
      <div className="tricolor" aria-hidden="true">
        <span className="tricolor-yellow" />
        <span className="tricolor-blue" />
        <span className="tricolor-red" />
      </div>

      {hasDraft && !adminOpen && (
        <button className="draft-banner" onClick={openAdmin}>
          Previewing unpublished changes — tap to open the panel
        </button>
      )}

      <header className="hero">
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          una guía de la ciudad · a city guide
        </motion.p>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, type: 'spring', stiffness: 200, damping: 24 }}
        >
          Ashley&rsquo;s <em>San Francisco</em>
        </motion.h1>
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
        >
          {allPlaces.length || '…'} spots to eat, drink &amp; wander — con un toquecito colombiano&nbsp;🇨🇴
        </motion.p>
      </header>

      <main className="main">
        <LayoutGroup>
          <FilterBar
            active={active}
            onChange={setActive}
            query={query}
            onQueryChange={setQuery}
            counts={counts}
          />

          <div className="results-meta" aria-live="polite">
            {loading
              ? 'Loading the list…'
              : filtered.length === allPlaces.length
                ? `Showing everything (${filtered.length})`
                : `${filtered.length} place${filtered.length === 1 ? '' : 's'}`}
            {visited.size > 0 && (
              <span className="visited-count"> · {visited.size} visited 💛</span>
            )}
          </div>

          <motion.ul className="grid" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <PlaceCard
                  key={p.id}
                  place={p}
                  visited={visited.has(p.id)}
                  onToggleVisited={toggleVisited}
                />
              ))}
            </AnimatePresence>
          </motion.ul>

          {!loading && filtered.length === 0 && (
            <motion.p
              className="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Nada por aquí… try a different search 🔍
            </motion.p>
          )}
        </LayoutGroup>
      </main>

      <footer className="footer">
        <button
          className="footer-flag"
          onClick={onFlagTap}
          aria-label="Colombian flag"
          title="🤫"
        >
          <span className="tricolor-yellow" />
          <span className="tricolor-blue" />
          <span className="tricolor-red" />
        </button>
        <p>Hecho con amor para Ashley — San Francisco, CA</p>
      </footer>

      <AdminPanel
        open={adminOpen}
        onClose={closeAdmin}
        places={allPlaces}
        hasDraft={hasDraft}
        onChange={setDraft}
        onDiscard={() => setDraft(null)}
        onPublished={markPublished}
      />
    </div>
  );
}
