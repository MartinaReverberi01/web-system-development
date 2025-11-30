import { Router } from 'express';

let books = [
  { id: '1', title: 'Clean Code', author: 'Robert C. Martin' },
  { id: '2', title: "You Don't Know JS", author: 'Kyle Simpson' }
];

const bookRouter = Router();

const generateId = () => {
  const maxId =
    books.length > 0
      ? Math.max(...books.map((b) => Number(b.id)))
      : 0;
  return String(maxId + 1);
};

bookRouter.get('/', (req, res) => {
  res.json(books);
});

bookRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({ error: 'book not found' });
  }

  res.json(book);
});

bookRouter.post('/', (req, res) => {
  const body = req.body;

  if (!body.title || !body.author) {
    return res.status(400).json({
      error: 'title and author are required'
    });
  }

  const newBook = {
    id: generateId(),
    title: body.title,
    author: body.author
  };

  books = books.concat(newBook);
  res.status(201).json(newBook);
});

bookRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  books = books.filter(b => b.id !== id);

  res.status(204).end();
});

export default bookRouter;
