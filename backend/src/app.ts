import express from 'express';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middleware/errorHandler';
import cookieParser from 'cookie-parser';

export const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'creature-codex-api',
  });
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);