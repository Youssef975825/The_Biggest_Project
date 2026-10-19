import type { ActivityKind, MonthlyPack, Resource, Story, Theme } from './types';

const res = (title: string, file?: string): Resource => ({ title, file });
const story = (n: 1 | 2 | 3 | 4, title: string, releaseDate: string): Story => ({
  id: `story-${n}`, number: n, title, releaseDate,
  activities: {
    story: res(`Story ${n}: ${title}`),
    worksheet: res('Worksheet'),
    flashcards: res('Flashcards'),
    crafts: res('Crafts'),
    Games: res('5 Mini-Games Center', `bees/games`),
  } satisfies Record<ActivityKind, Resource>,
});

// PLACEHOLDER CONTENT: replace titles, dates and file paths with the client's real material.
const beesNov: MonthlyPack = {
  month: '2026-10',
  stories: [
    story(1, 'Bella Finds a Flower', '2026-10-01'),
    story(2, 'The Busy Hive', '2026-11-08'),
    story(3, 'Honey Day', '2026-11-15'),
    story(4, 'Bella Says Goodbye to Autumn', '2026-11-22'),
  ],
  decoration: [res('Bee classroom banner'), res('Door sign')],
  teacherGuide: res('Teacher guide: November'),
};

export const THEMES: Theme[] = [
  { id: 'bees', status: 'available', name: 'Bees', icon: '🐝', packs: [beesNov] },
  { id: 'dino', status: 'locked', name: 'Dinosaurs', icon: '🦖', packs: [] },
  { id: 'space', status: 'locked', name: 'Space', icon: '🚀', packs: [] },
];
export const getTheme = (id?: string) => THEMES.find(t => t.id === id);