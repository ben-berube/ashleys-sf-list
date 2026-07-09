import { motion } from 'framer-motion';
import { CATEGORY_MAP, type Place } from '../data/places';

interface PlaceCardProps {
  place: Place;
  visited: boolean;
  onToggleVisited: (id: string) => void;
}

export function PlaceCard({ place, visited, onToggleVisited }: PlaceCardProps) {
  const primary = CATEGORY_MAP[place.categories[0]];

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.18 } }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      whileHover={{ y: -5 }}
      className={`card${visited ? ' card--visited' : ''}`}
      style={{ '--accent': primary.accent } as React.CSSProperties}
    >
      <span className="card-stripe" aria-hidden="true" />
      <div className="card-body">
        <div className="card-top">
          <span className="card-emoji" aria-hidden="true">{primary.emoji}</span>
          <button
            className={`visit-btn${visited ? ' visit-btn--on' : ''}`}
            onClick={() => onToggleVisited(place.id)}
            aria-pressed={visited}
            aria-label={visited ? `Unmark ${place.name} as visited` : `Mark ${place.name} as visited`}
            title={visited ? 'Been here!' : 'Mark as visited'}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21s-7.5-4.7-10-9.3C.4 8.4 2.4 4.5 6.2 4.5c2.2 0 3.7 1.2 4.6 2.6C11.7 5.7 13.2 4.5 15.4 4.5c3.8 0 5.8 3.9 4.2 7.2C19.5 16.3 12 21 12 21z" />
            </svg>
          </button>
        </div>
        <h3 className="card-name">{place.name}</h3>
        {place.note && <p className="card-note">{place.note}</p>}
        <div className="card-tags">
          {place.categories.map((catId) => {
            const cat = CATEGORY_MAP[catId];
            return (
              <span key={catId} className="tag" style={{ '--accent': cat.accent } as React.CSSProperties}>
                {cat.label}
              </span>
            );
          })}
        </div>
      </div>
      {visited && <span className="visited-badge">estuve aquí ✓</span>}
    </motion.li>
  );
}
