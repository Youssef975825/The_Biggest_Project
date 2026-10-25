import { createContext, useContext } from 'react';

/** Lets any page (e.g. Home's "Watch Intro" button) replay the intro without prop drilling. */
export const ReplayIntroContext = createContext<() => void>(() => {});

export const useReplayIntro = () => useContext(ReplayIntroContext);
