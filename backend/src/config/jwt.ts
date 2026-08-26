import type { SignOptions } from 'jsonwebtoken';

export const JWT_CONFIG = {
  accessSecret: process.env.JWT_ACCESS_SECRET!,
  refreshSecret: process.env.JWT_REFRESH_SECRET!,
  expiresIn: '15m',
  refreshExpiresIn: '7d',
} as const;

// Para los options de firma
export const accessTokenOptions: SignOptions = {
  expiresIn: JWT_CONFIG.expiresIn,
};

export const refreshTokenOptions: SignOptions = {
  expiresIn: JWT_CONFIG.refreshExpiresIn,
};