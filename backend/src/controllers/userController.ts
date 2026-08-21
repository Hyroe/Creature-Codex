import type { Request, Response } from 'express';

import { getUsers } from '../services/userService';

export async function listUsers(
  _req: Request,
  res: Response,
) {
  const users = await getUsers();

  res.json(users);
}