// src/data/types.ts: content model. Content stays English; only the UI chrome is translated.
export type ThemeId = 'bees' | 'dino' | 'space';
export type ThemeStatus = 'available' | 'locked';
export type ActivityKind = 'story' | 'worksheet' | 'flashcards' | 'crafts' | 'Games';

export interface Resource {
  title: string;
  file?: string;            // PDF/image path when the client delivers real files
  body?: string;            // inline story text so the page is not an empty alert()
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