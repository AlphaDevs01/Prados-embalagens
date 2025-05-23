import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
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





// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });

// Só exporte o app, não chame app.listen em ambiente serverless
export default app;
