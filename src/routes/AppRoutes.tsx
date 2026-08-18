import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainLayout } from '../layouts/MainLayout';
import { CreatureDetailsPage } from '../pages/CreatureDetailsPage';
import { CreaturesPage } from '../pages/CreaturesPage';
import { HomePage } from '../pages/HomePage';
import { LibraryPage } from '../pages/LibraryPage';
import { ElementsLibraryPage } from '../features/library/pages/ElementsLibraryPage';
import { DietsLibraryPage } from '../features/library/pages/DietsLibraryPage';
import { DamageTypesLibraryPage } from '../features/library/pages/DamageTypesLibraryPage';
import { BodyPartsLibraryPage } from '../features/library/pages/BodyPartsLibraryPage';
import { HabitatsLibraryPage } from '../features/library/pages/HabitatsLibraryPage';
import { ElementDetailsPage } from '../features/library/pages/ElementDetailsPage';
import { DamageTypeDetailsPage } from '../features/library/pages/DamageTypeDetailsPage';
import { BodyPartDetailsPage } from '../features/library/pages/BodyPartDetailsPage';
import { HabitatDetailsPage } from '../features/library/pages/HabitatDetailsPage';
import { DietDetailsPage } from '../features/library/pages/DietDetailsPage';
import NotFoundPage from '../pages/NotFoundPage';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/creatures" element={<CreaturesPage />} />
          <Route path="/creatures/:id" element={<CreatureDetailsPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/library/elements" element={<ElementsLibraryPage />} />
          <Route
            path="/library/damage-types"
            element={<DamageTypesLibraryPage />}
          />
          <Route
            path="/library/body-parts"
            element={<BodyPartsLibraryPage />}
          />
          <Route path="/library/habitats" element={<HabitatsLibraryPage />} />
          <Route path="/library/diets" element={<DietsLibraryPage />} />
          <Route
            path="/library/elements/:id"
            element={<ElementDetailsPage />}
          />
          <Route
            path="/library/damage-types/:id"
            element={<DamageTypeDetailsPage />}
          />
          <Route
            path="/library/body-parts/:id"
            element={<BodyPartDetailsPage />}
          />
          <Route
            path="/library/habitats/:id"
            element={<HabitatDetailsPage />}
          />
          <Route path="/library/diets/:id" element={<DietDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
