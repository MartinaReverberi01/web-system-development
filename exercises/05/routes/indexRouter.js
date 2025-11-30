import { Router } from 'express';

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

export default indexRouter;
