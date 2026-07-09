import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { FilterBar } from './components/FilterBar';
import { PlaceCard } from './components/PlaceCard';
import { CATEGORIES, PLACES, type CategoryId } from './data/places';

const VISITED_KEY = 'ashleys-sf-visited';

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
    const c: Record<string, number> = { all: PLACES.length };
    for (const cat of CATEGORIES) {
      c[cat.id] = PLACES.filter((p) => p.categories.includes(cat.id)).length;
    }
    return c;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PLACES.filter((p) => {
      const matchesCategory = active === 'all' || p.categories.includes(active);
      const matchesQuery =
        q === '' ||
        p.name.toLowerCase().includes(q) ||
        (p.note ?? '').toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [active, query]);

  return (
    <div className="app">
      <div className="tricolor" aria-hidden="true">
        <span className="tricolor-yellow" />
        <span className="tricolor-blue" />
        <span className="tricolor-red" />
      </div>

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
          {PLACES.length} spots to eat, drink &amp; wander — con un toquecito colombiano&nbsp;🇨🇴
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
            {filtered.length === PLACES.length
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

          {filtered.length === 0 && (
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
        <span className="footer-flag" aria-hidden="true">
          <span className="tricolor-yellow" />
          <span className="tricolor-blue" />
          <span className="tricolor-red" />
        </span>
        <p>Hecho con amor para Ashley — San Francisco, CA</p>
      </footer>
    </div>
  );
}
