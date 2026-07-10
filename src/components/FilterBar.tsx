import { motion } from 'framer-motion';
import {
  NEIGHBORHOODS,
  ACTIVITIES,
  EXPERIENCES,
  type ActivityId,
  type ExperienceId,
  type NeighborhoodId,
  type Tag,
} from '../data/places';

export interface Filters {
  neighborhood: NeighborhoodId | 'any';
  activity: ActivityId | 'any';
  experience: ExperienceId | 'any';
}

export interface FilterCounts {
  neighborhood: Record<string, number>;
  activity: Record<string, number>;
  experience: Record<string, number>;
}

interface FilterBarProps {
  filters: Filters;
  onChange: (next: Filters) => void;
  query: string;
  onQueryChange: (q: string) => void;
  counts: FilterCounts;
}

export function FilterBar({ filters, onChange, query, onQueryChange, counts }: FilterBarProps) {
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

      <FilterGroup
        groupId="neighborhood"
        label="Neighborhood"
        anyEmoji="🌉"
        options={NEIGHBORHOODS}
        active={filters.neighborhood}
        counts={counts.neighborhood}
        onSelect={(id) => onChange({ ...filters, neighborhood: id as NeighborhoodId | 'any' })}
      />
      <FilterGroup
        groupId="activity"
        label="Activity"
        anyEmoji="🎉"
        options={ACTIVITIES}
        active={filters.activity}
        counts={counts.activity}
        onSelect={(id) => onChange({ ...filters, activity: id as ActivityId | 'any' })}
      />
      <FilterGroup
        groupId="experience"
        label="Experience"
        anyEmoji="💫"
        options={EXPERIENCES}
        active={filters.experience}
        counts={counts.experience}
        onSelect={(id) => onChange({ ...filters, experience: id as ExperienceId | 'any' })}
      />
    </div>
  );
}

interface FilterGroupProps {
  groupId: string;
  label: string;
  anyEmoji: string;
  options: Tag<string>[];
  active: string;
  counts: Record<string, number>;
  onSelect: (id: string) => void;
}

function FilterGroup({ groupId, label, anyEmoji, options, active, counts, onSelect }: FilterGroupProps) {
  return (
    <div className="filter-group">
      <span className="filter-group-label">{label}</span>
      <div className="chips" role="tablist" aria-label={`Filter by ${label}`}>
        <Chip
          pillId={`pill-${groupId}`}
          isActive={active === 'any'}
          onClick={() => onSelect('any')}
          emoji={anyEmoji}
          label="Any"
          count={counts.any ?? 0}
          accent="#b8860b"
        />
        {options.map((opt) => (
          <Chip
            key={opt.id}
            pillId={`pill-${groupId}`}
            isActive={active === opt.id}
            onClick={() => onSelect(opt.id)}
            emoji={opt.emoji}
            label={opt.label}
            count={counts[opt.id] ?? 0}
            accent={opt.accent}
          />
        ))}
      </div>
    </div>
  );
}

interface ChipProps {
  pillId: string;
  isActive: boolean;
  onClick: () => void;
  emoji: string;
  label: string;
  count: number;
  accent: string;
}

function Chip({ pillId, isActive, onClick, emoji, label, count, accent }: ChipProps) {
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
          layoutId={pillId}
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
