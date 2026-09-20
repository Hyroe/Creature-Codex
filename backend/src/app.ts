import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';

import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import creatureRoutes from './routes/creatureRoutes';
import cookieParser from 'cookie-parser';
import libraryRoutes from './routes/libraryRoutes';
import commentRoutes from './routes/commentRoutes';

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
app.use('/api/creatures', creatureRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api', commentRoutes);

app.use(errorHandler);
