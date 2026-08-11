import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainLayout } from '../layouts/MainLayout';
import { CreatureDetailsPage } from '../pages/CreatureDetailsPage';
import { CreaturesPage } from '../pages/CreaturesPage';
import { HomePage } from '../pages/HomePage';
import { LibraryPage } from '../pages/LibraryPage';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/creatures" element={<CreaturesPage />} />
          <Route path="/creatures/:id" element={<CreatureDetailsPage />} />
          <Route path="/library" element={<LibraryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}