import { motion } from 'framer-motion';
import { CATEGORIES, type CategoryId } from '../data/places';

interface FilterBarProps {
  active: CategoryId | 'all';
  onChange: (id: CategoryId | 'all') => void;
  query: string;
  onQueryChange: (q: string) => void;
  counts: Record<string, number>;
}

export function FilterBar({ active, onChange, query, onQueryChange, counts }: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="search-wrap">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          className="search-input"
          placeholder="Buscar… search the list"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search places"
        />
      </div>

      <div className="chips" role="tablist" aria-label="Filter by category">
        <Chip
          isActive={active === 'all'}
          onClick={() => onChange('all')}
          emoji="🌉"
          label="Everything"
          count={counts.all}
          accent="#b8860b"
        />
        {CATEGORIES.map((cat) => (
          <Chip
            key={cat.id}
            isActive={active === cat.id}
            onClick={() => onChange(cat.id)}
            emoji={cat.emoji}
            label={cat.label}
            count={counts[cat.id]}
            accent={cat.accent}
          />
        ))}
      </div>
    </div>
  );
}

interface ChipProps {
  isActive: boolean;
  onClick: () => void;
  emoji: string;
  label: string;
  count: number;
  accent: string;
}

function Chip({ isActive, onClick, emoji, label, count, accent }: ChipProps) {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      className={`chip${isActive ? ' chip--active' : ''}`}
      style={{ '--chip-accent': accent } as React.CSSProperties}
      onClick={onClick}
    >
      {isActive && (
        <motion.span
          layoutId="chip-pill"
          className="chip-pill"
          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
        />
      )}
      <span className="chip-content">
        <span className="chip-emoji" aria-hidden="true">{emoji}</span>
        {label}
        <span className="chip-count">{count}</span>
      </span>
    </button>
  );
}
