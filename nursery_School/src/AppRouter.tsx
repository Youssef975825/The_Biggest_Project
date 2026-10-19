import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // تأكد إن مسار صفحة الهوم عندك مظبوط
import ThemesPage from './pages/ThemesPage';
import ThemePage from './pages/ThemePage';
import StoryPage from './pages/StoryPage';
import ContactPage from './pages/ContactPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* مسار الصفحة الرئيسية اللي كان مختفي */}
      <Route path="/" element={<Home introFinished={true} />} />
      
      <Route path="/themes" element={<ThemesPage />} />
      <Route path="/themes/:themeId" element={<ThemePage />} />
      <Route path="/themes/:themeId/stories/:storyId" element={<StoryPage />} />
      <Route path="/contact" element={<ContactPage />} />
      
      {/* الروابط القديمة */}
      <Route path="/bees" element={<Navigate to="/themes/bees" replace />} />
      <Route path="/dinosaur" element={<Navigate to="/themes/dino" replace />} />
      <Route path="/space" element={<Navigate to="/themes/space" replace />} />
      <Route path="/worksheets" element={<Navigate to="/themes" replace />} />
    </Routes>
  );
}