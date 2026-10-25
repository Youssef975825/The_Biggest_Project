import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ThemesPage from './pages/ThemesPage';
import ThemePage from './pages/ThemePage';
import StoryPage from './pages/StoryPage';
import GamesHubPage from './pages/GamesHubPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

export default function AppRoutes({ introFinished }: { introFinished: boolean }) {
  return (
    <Routes>
      <Route path="/" element={<Home introFinished={introFinished} />} />
      <Route path="/themes" element={<ThemesPage />} />
      <Route path="/themes/:themeId" element={<ThemePage />} />
      <Route path="/themes/:themeId/stories/:storyId" element={<StoryPage />} />
      
        {/* مسار مركز الألعاب الخاص بكل قصة منفصلة */}
        <Route path="/themes/:themeId/stories/:storyId/games" element={<GamesHubPage />} />

      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      
      {/* الروابط القديمة */}
      <Route path="/bees" element={<Navigate to="/themes/bees" replace />} />
      <Route path="/dinosaur" element={<Navigate to="/themes/dino" replace />} />
      <Route path="/space" element={<Navigate to="/themes/space" replace />} />
      <Route path="/worksheets" element={<Navigate to="/themes" replace />} />
    </Routes>
  );
}