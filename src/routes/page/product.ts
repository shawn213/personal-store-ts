import { Router } from 'express';

const router = Router();

router.route('/:id').get((req, res) => {
  res.render('product');
});

export default router;
