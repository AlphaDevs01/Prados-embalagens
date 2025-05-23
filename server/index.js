import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categories.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Servir frontend do build do Vite
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viteDistPath = path.join(__dirname, '..', 'dist');

app.use(express.static(viteDistPath));

// SPA fallback: sempre retorna index.html para rotas não-API
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).end();
  res.sendFile(path.join(viteDistPath, 'index.html'));
});

export default app;