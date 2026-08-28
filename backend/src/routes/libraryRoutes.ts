import { Router } from 'express';

import {
  listBodyParts,
  listDamageTypes,
  listDiets,
  listElements,
  listHabitats,
  summary,
  getElement,
  getBodyPart,
  getDiet,
  getHabitat,
  getDamageType,
} from '../controllers/libraryController';

const router = Router();

router.get('/summary', summary);

router.get('/elements', listElements);
router.get('/elements/:id', getElement);

router.get('/damage-types', listDamageTypes);
router.get('/damage-types/:id', getDamageType);

router.get('/body-parts', listBodyParts);
router.get('/body-parts/:id', getBodyPart);

router.get('/habitats', listHabitats);
router.get('/habitats/:id', getHabitat);

router.get('/diets', listDiets);
router.get('/diets/:id', getDiet);

export default router;
