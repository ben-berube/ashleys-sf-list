export type CategoryId =
  | 'wine'
  | 'beer'
  | 'cocktails'
  | 'vibes'
  | 'speakeasy'
  | 'restaurants'
  | 'nature'
  | 'explore';

export interface Category {
  id: CategoryId;
  label: string;
  emoji: string;
  accent: string;
}

export interface Place {
  id: string;
  name: string;
  categories: CategoryId[];
  note?: string;
}

export const CATEGORIES: Category[] = [
  { id: 'wine', label: 'Wine', emoji: '🍷', accent: '#8e2437' },
  { id: 'beer', label: 'Beer', emoji: '🍺', accent: '#c8861f' },
  { id: 'cocktails', label: 'Cocktails & Vibes', emoji: '🍸', accent: '#ce1126' },
  { id: 'vibes', label: 'Overall Vibes', emoji: '✨', accent: '#2d5da8' },
  { id: 'speakeasy', label: 'Speakeasies', emoji: '🎩', accent: '#4a2c4e' },
  { id: 'restaurants', label: 'Restaurants', emoji: '🍽️', accent: '#c1512f' },
  { id: 'nature', label: 'Nature & Scenic', emoji: '🌿', accent: '#2e7d4f' },
  { id: 'explore', label: 'Places to Explore', emoji: '🧭', accent: '#17767b' },
];

export const CATEGORY_MAP: Record<CategoryId, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<CategoryId, Category>;

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function uniqueId(name: string, existing: Place[]): string {
  const base = slugify(name) || 'place';
  let id = base;
  let n = 2;
  while (existing.some((p) => p.id === id)) {
    id = `${base}-${n}`;
    n += 1;
  }
  return id;
}
