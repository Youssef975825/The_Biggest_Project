import type { ActivityKind, MonthlyPack, Resource, Story, Theme } from './types';

const res = (title: string, file?: string, body?: string): Resource => ({ title, file, body });

const story = (
  n: 1 | 2 | 3 | 4,
  title: string,
  releaseDate: string,
  gamesFile: string,
  storyBody?: string,
): Story => ({
  id: `story-${n}`,
  number: n,
  title,
  releaseDate,
  activities: {
    story: res(`Story ${n}: ${title}`, undefined, storyBody),
    worksheet: res('Worksheet'),
    flashcards: res('Flashcards'),
    crafts: res('Crafts'),
    Games: res('5 Mini-Games Center', gamesFile),
  } satisfies Record<ActivityKind, Resource>,
});

const BELLA_FLOWER = `Bella the little bee woke up to a warm morning. She flew past the hive and spotted a bright yellow flower she had never seen before.

"I will remember this flower," Bella said, "so I can tell my friends where the sweet nectar is."

She danced in the air, counted the petals, and flew home with a story to share.`;

const REXY_ADVENTURE = `Rexy the little dinosaur stepped out of the jungle and sniffed the morning air. Today felt like a big adventure.

He followed a trail of friendly footprints, found a shiny egg under a fern, and roared a happy roar that made the trees shake — just a little.

"I can be brave and kind," Rexy said, and he skipped back to his friends.`;

const beesNov: MonthlyPack = {
  month: '2026-10',
  stories: [
    story(1, 'Bella Finds a Flower', '2026-10-01', 'bees/games', BELLA_FLOWER),
    story(2, 'The Busy Hive', '2026-11-08', 'bees/games'),
    story(3, 'Honey Day', '2026-11-15', 'bees/games'),
    story(4, 'Bella Says Goodbye to Autumn', '2026-11-22', 'bees/games'),
  ],
  decoration: [res('Bee classroom banner'), res('Door sign')],
  teacherGuide: res('Teacher guide: November'),
};

const dinoNov: MonthlyPack = {
  month: '2026-10',
  stories: [
    story(1, "Rexy’s Big Adventure", '2026-10-01', 'dino/games', REXY_ADVENTURE),
    story(2, "The Prehistoric Jungle", '2026-11-08', 'dino/games'),
    story(3, "Fossil Hunt Day", '2026-11-15', 'dino/games'),
    story(4, "Dino Goodbye to Sunset", '2026-11-22', 'dino/games'),
  ],
  decoration: [res('Dino classroom banner'), res('Door sign')],
  teacherGuide: res('Teacher guide: Dino World'),
};

export const THEMES: Theme[] = [
  { id: 'bees', status: 'available', name: 'Bees', icon: '🐝', packs: [beesNov] },
  { id: 'dino', status: 'available', name: 'Dinosaurs', icon: '🦖', packs: [dinoNov] },
  { id: 'space', status: 'locked', name: 'Space', icon: '🚀', packs: [] },
];
export const getTheme = (id?: string) => THEMES.find(t => t.id === id);
