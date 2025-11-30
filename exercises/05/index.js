import express from 'express';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

import bookRouter from './routes/bookRouter.js';
import indexRouter from './routes/indexRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(express.json());

// Static
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/books', bookRouter);

// Unknown endpoint
app.use((req, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Books API running on port ${PORT}`);
});
