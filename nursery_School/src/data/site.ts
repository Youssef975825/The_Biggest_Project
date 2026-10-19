// Placeholder contact details: replace with the client's real ones.
export const SITE = {
  email: 'littlewonderstudio26@gmail.com',
  whatsapp: 'https://wa.me/200000000000',
  facebook: 'https://facebook.com/',
  instagram: 'https://instagram.com/',
} as const;

/** 'cumulative' = every released story stays visible; 'current-only' = only this week's story. */
export const RELEASE_MODE: 'cumulative' | 'current-only' = 'cumulative';
