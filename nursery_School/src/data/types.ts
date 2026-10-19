// src/data/types.ts: content model. Content stays English; only the UI chrome is translated.
export type ThemeId = 'bees' | 'dino' | 'space';
export type ThemeStatus = 'available' | 'locked';          // Dino and Space = 'locked' for now
export type ActivityKind = 'story' | 'worksheet' | 'flashcards' | 'crafts';

export interface Resource {
  title: string;
  file?: string;            // e.g. '/downloads/bees/2026-11/story-1-worksheet.pdf'
}
export interface Story {
  id: string;               // 'story-1'
  number: 1 | 2 | 3 | 4;
  title: string;            // 'Bella Finds a Flower'
  releaseDate: string;      // 'YYYY-MM-DD' (Cairo time): week 1, week 2, ...
  activities: Record<ActivityKind, Resource>;
}
export interface MonthlyPack {
  month: string;            // 'YYYY-MM'
  stories: [Story, Story, Story, Story];
  decoration: Resource[];
  teacherGuide: Resource;
}
export interface Theme {
  id: ThemeId;
  status: ThemeStatus;
  name: string;
  icon: string;
  packs: MonthlyPack[];     // a new pack is added each month
}