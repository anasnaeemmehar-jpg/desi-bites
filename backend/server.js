import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
import categoryRoutes from './routes/category.js';
import orderRoutes from './routes/order.js';
import customerRoutes from './routes/customer.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

// CORS: allow specific origins in production, everything in dev
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : true; // true = reflect request origin (dev-friendly default)

app.use(cors({ origin: allowedOrigins, credentials: true }));

// Ensure uploads folder exists (configurable for persistent disk in production)
const uploadsDir = process.env.UPLOADS_DIR || path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Ensure database is seeded (auto-seed on first run).
// Note: importing db.js elsewhere already creates an empty .db file on disk,
// so we check for an actual table rather than just file existence.
const db = (await import('./config/database.js')).default;
const hasTables = db
  .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='categories'")
  .get();
if (!hasTables) {
  console.log('Database not seeded yet, seeding...');
  const { execSync } = await import('child_process');
  execSync('node config/seed.js', { cwd: __dirname, stdio: 'inherit' });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadsDir));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'DesiBites API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/customers', customerRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`DesiBites API running on http://localhost:${PORT}`);
});
