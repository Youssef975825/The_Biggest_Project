import type { ActivityKind, MonthlyPack, Resource, Story, Theme } from './types';

const res = (title: string, file?: string, body?: string): Resource => ({ title, file, body });
const pageUrls = (folder: string, count: number): string[] =>
  Array.from({ length: count }, (_, i) => `${folder}/${String(i + 1).padStart(2, '0')}.webp`);

type Extras = Partial<Record<ActivityKind, Partial<Resource>>>;

const story = (
  n: 1 | 2 | 3 | 4,
  title: string,
  releaseDate: string,
  gamesFile: string,
  storyBody?: string,
  extras: Extras = {},
): Story => ({
  id: `story-${n}`,
  number: n,
  title,
  releaseDate,
  activities: {
    story: { ...res(`Story ${n}: ${title}`, undefined, storyBody), ...extras.story },
    worksheet: { ...res('Worksheet'), ...extras.worksheet },
    flashcards: { ...res('Flashcards'), ...extras.flashcards },
    crafts: { ...res('Crafts'), ...extras.crafts },
    Games: res('5 Mini-Games Center', gamesFile),
  } satisfies Record<ActivityKind, Resource>,
});

const BELLA_FLOWER = `Bella the little bee woke up to a warm morning. She flew past the hive and spotted a bright yellow flower she had never seen before.

"I will remember this flower," Bella said, "so I can tell my friends where the sweet nectar is."

She danced in the air, counted the petals, and flew home with a story to share.`;

const REXY_ADVENTURE = `Rexy the little dinosaur stepped out of the jungle and sniffed the morning air. Today felt like a big adventure.

He followed a trail of friendly footprints, found a shiny egg under a fern, and roared a happy roar that made the trees shake — just a little.

"I can be brave and kind," Rexy said, and he skipped back to his friends.`;

const BEES_S1 = '/files/bees/story-1';
const BEES_S2 = "/files/bees/story-2";
const BEES_S3 = "/files/bees/story-3";
const BEES_S4 = "/files/bees/story-4";
const beesNov: MonthlyPack = {
  month: "2026-10",
  stories: [
    story(1, "Bella Finds a Flower", "2026-10-01", "bees/games", BELLA_FLOWER, {
      story: { pages: pageUrls(`${BEES_S1}/story`, 4) },
      worksheet: {
        pages: pageUrls(`${BEES_S1}/worksheet`, 6),
        file: `${BEES_S1}/worksheet.pdf`,
      },
      flashcards: {
        pages: [
          ...pageUrls(`${BEES_S1}/flashcards-1`, 6),
          ...pageUrls(`${BEES_S1}/flashcards-2`, 9),
        ],
        files: [
          { label: "Part 1", url: `${BEES_S1}/flashcards-1.pdf` },
          { label: "Part 2", url: `${BEES_S1}/flashcards-2.pdf` },
        ],
      },
      crafts: {
        pages: pageUrls(`${BEES_S1}/crafts`, 6),
        file: `${BEES_S1}/crafts.pdf`,
      },
    }),
    story(2, "Bella Asks for Help", "2026-10-08", "bees/games", undefined, {
      story: { pages: pageUrls(`${BEES_S2}/story`, 4) },
      worksheet: {
        pages: pageUrls(`${BEES_S2}/worksheet`, 6),
        file: `${BEES_S2}/worksheet.pdf`,
      },
      flashcards: {
        pages: pageUrls(`${BEES_S2}/flashcards`, 5),
        file: `${BEES_S2}/flashcards.pdf`,
      },
      crafts: {
        pages: pageUrls(`${BEES_S2}/crafts`, 6),
        file: `${BEES_S2}/crafts.pdf`,
      },
    }),
    story(3, "The Lost Honey Drop", "2026-10-10", "bees/games", undefined, {
      story: { pages: pageUrls(`${BEES_S3}/story`, 5) },
      worksheet: {
        pages: pageUrls(`${BEES_S3}/worksheet`, 5),
        file: `${BEES_S3}/worksheet.pdf`,
      },
      flashcards: {
        pages: pageUrls(`${BEES_S3}/flashcards`, 7),
        file: `${BEES_S3}/flashcards.pdf`,
      },
      crafts: {
        pages: pageUrls(`${BEES_S3}/crafts`, 5),
        file: `${BEES_S3}/crafts.pdf`,
      },
    }),
    story(4, "The Garden Party", "2026-10-18", "bees/games", undefined, {
      story: { pages: pageUrls(`${BEES_S4}/story`, 4) },
      worksheet: {
        pages: pageUrls(`${BEES_S4}/worksheet`, 7),
        file: `${BEES_S4}/worksheet.pdf`,
      },
      flashcards: {
        pages: pageUrls(`${BEES_S4}/flashcards`, 4),
        file: `${BEES_S4}/flashcards.pdf`,
      },
      crafts: {
        pages: pageUrls(`${BEES_S4}/crafts`, 7),
        file: `${BEES_S4}/crafts.pdf`,
      },
    }),
  ],
  decoration: [res("Bee classroom banner"), res("Door sign")],
  teacherGuide: res("Teacher guide: November"),
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
