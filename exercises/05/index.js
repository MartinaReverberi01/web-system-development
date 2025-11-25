import express from 'express';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Middlewares
app.use(express.json());

// Config per path assoluto (come per EJS/static)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serviamo i file statici dalla cartella "public"
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

// Dati in memoria (niente database)
let books = [
  { id: '1', title: 'Clean Code', author: 'Robert C. Martin' },
  { id: '2', title: 'You Don\'t Know JS', author: 'Kyle Simpson' }
];

// GET /books - restituisce tutta la lista
app.get('/books', (request, response) => {
  response.json(books);
});

// GET /books/:id - singolo libro per ID
app.get('/books/:id', (request, response) => {
  const { id } = request.params;
  const book = books.find((b) => b.id === id);

  if (book) {
    response.json(book);
  } else {
    response.status(404).json({ error: 'book not found' });
  }
});


const generateId = () => {
  const maxId =
    books.length > 0
      ? Math.max(...books.map((b) => Number(b.id)))
      : 0;
  return String(maxId + 1);
};

// POST /books - aggiunge un nuovo libro
app.post('/books', (request, response) => {
  const body = request.body;

  // controllo dei campi richiesti (error handling)
  if (!body.title || !body.author) {
    return response.status(400).json({
      error: 'title and author are required'
    });
  }

  const newBook = {
    id: generateId(),
    title: body.title,
    author: body.author
  };

  books = books.concat(newBook);

  // 201 Created (migliore di 200 per una creazione)
  response.status(201).json(newBook);
});

// DELETE /books/:id - elimina libro per ID
app.delete('/books/:id', (request, response) => {
  const { id } = request.params;

  // filtriamo per rimuovere il libro
  books = books.filter((b) => b.id !== id);

  // come nelle slide: rispondiamo comunque 204
  response.status(204).end();
});

// Middleware per endpoint sconosciuti (deve stare DOPO le rotte)
app.use((request, response) => {
  response.status(404).json({ error: 'unknown endpoint' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Books API running on port ${PORT}`);
});
