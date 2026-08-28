import type { Request, Response } from 'express';

import {
  getBodyParts,
  getDamageTypes,
  getDiets,
  getElements,
  getHabitats,
  getLibrarySummary,
  getElementById,
  getDietById,
  getHabitatById,
  getBodyPartById,
  getDamageTypeById,
} from '../services/libraryService';

export async function listElements(_req: Request, res: Response) {
  res.json({
    elements: await getElements(),
  });
}

export async function listDamageTypes(_req: Request, res: Response) {
  res.json({
    damageTypes: await getDamageTypes(),
  });
}

export async function listBodyParts(_req: Request, res: Response) {
  res.json({
    bodyParts: await getBodyParts(),
  });
}

export async function listHabitats(_req: Request, res: Response) {
  res.json({
    habitats: await getHabitats(),
  });
}

export async function listDiets(_req: Request, res: Response) {
  res.json({
    diets: await getDiets(),
  });
}

export async function summary(_req: Request, res: Response) {
  const data = await getLibrarySummary();

  res.status(200).json(data);
}

export async function getElement(req: Request, res: Response) {
  const rawId = req.params.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  if (!id) {
    res.status(400).json({
      message: 'Invalid element id',
    });
    return;
  }

  const result = await getElementById(id);

  if (!result) {
    res.status(404).json({
      message: 'Element not found',
    });
    return;
  }

  res.status(200).json(result);
}

export async function getBodyPart(req: Request, res: Response) {
  const rawId = req.params.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  if (!id) {
    res.status(400).json({
      message: 'Invalid element id',
    });
    return;
  }

  const result = await getBodyPartById(id);

  if (!result) {
    res.status(404).json({
      message: 'Body Part not found',
    });
    return;
  }

  res.status(200).json(result);
}

export async function getHabitat(req: Request, res: Response) {
  const rawId = req.params.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  if (!id) {
    res.status(400).json({
      message: 'Invalid element id',
    });
    return;
  }

  const result = await getHabitatById(id);

  if (!result) {
    res.status(404).json({
      message: 'Habitat not found',
    });
    return;
  }

  res.status(200).json(result);
}

export async function getDiet(req: Request, res: Response) {
  const rawId = req.params.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  if (!id) {
    res.status(400).json({
      message: 'Invalid element id',
    });
    return;
  }

  const result = await getDietById(id);

  if (!result) {
    res.status(404).json({
      message: 'Diet not found',
    });
    return;
  }

  res.status(200).json(result);
}

export async function getDamageType(req: Request, res: Response) {
  const rawId = req.params.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  if (!id) {
    res.status(400).json({
      message: 'Invalid damage type id',
    });
    return;
  }

  const result = await getDamageTypeById(id);

  if (!result) {
    res.status(404).json({
      message: 'Damage type not found',
    });
    return;
  }

  res.status(200).json(result);
}
