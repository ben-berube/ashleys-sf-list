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

const place = (name: string, categories: CategoryId[], note?: string): Place => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  name,
  categories,
  note,
});

export const PLACES: Place[] = [
  // Wine
  place('Amelie', ['wine']),
  place('Bodega', ['wine']),
  place('Beretta', ['wine']),
  place('Golden Sardine', ['wine']),
  place('Qua o La', ['wine'], 'new wine bar'),
  place('Waystone', ['wine']),
  place('Key Klub', ['wine']),
  place('Bar Crudo', ['wine']),
  place('Fools Errand', ['wine', 'beer']),

  // Beer
  place("Murphy's Pub", ['beer']),
  place('Aces', ['beer']),
  place('Standard Deviant', ['beer']),

  // Cocktails & vibes
  place('El Chato', ['cocktails']),
  place('Peacekeeper', ['cocktails']),
  place('Harper & Rhye', ['cocktails']),
  place('Bar Darling', ['cocktails']),
  place('April Jean', ['cocktails']),
  place('Left Door', ['cocktails', 'speakeasy'], 'elevated chic'),
  place("Vesuvio's", ['cocktails']),
  place("Pellegrini's", ['cocktails']),
  place('Off the Record', ['cocktails']),
  place('Bar Morella', ['cocktails']),
  place('Persona', ['cocktails']),
  place('Hi Lo', ['cocktails']),

  // Overall vibes
  place('Busstop', ['vibes']),
  place('Boardroom', ['vibes']),
  place('Northstar', ['vibes']),
  place('Brazen Head', ['vibes']),
  place('Bar Crem', ['vibes']),
  place('The Page', ['vibes']),

  // Speakeasies
  place('The Speakeasy', ['speakeasy'], "1920's theme"),

  // Restaurants
  place('Back to Back', ['restaurants']),
  place("Lolita's", ['restaurants']),
  place('State Bird Provisions', ['restaurants']),
  place('Fable', ['restaurants']),
  place('Horsefeather', ['restaurants']),
  place('Liholiho', ['restaurants']),
  place('Nopa', ['restaurants']),
  place('House of Prime Rib', ['restaurants']),
  place('Boulevard', ['restaurants']),
  place('Hookfish', ['restaurants']),
  place('Kokkari', ['restaurants']),
  place('Cotogna', ['restaurants']),
  place("Tony's", ['restaurants']),
  place('Flour & Water', ['restaurants']),
  place('Out of Sight 2', ['restaurants']),
  place('China Live', ['restaurants']),

  // Nature / scenic
  place('Crissy Field / Marina Green', ['nature']),
  place('Golden Gate Park', ['nature']),
  place('Panhandle', ['nature']),
  place('Embarcadero', ['nature']),
  place('Bernal Heights Park', ['nature']),
  place('Corona Heights Park', ['nature']),
  place('Salesforce Tower Park', ['nature']),

  // Places to explore
  place("Johnson's Beach", ['explore'], 'Russian River'),
  place("Jack's", ['explore'], 'bar'),
  place('Hang Ah', ['explore'], 'dim sum'),
  place('Pagan Idol', ['explore']),
  place('Tonga', ['explore']),
  place('Rotunda', ['explore']),
];
