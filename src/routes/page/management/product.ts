import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('management/product');
})

router.route('/:id').get((req, res) => {
  res.render('management/product');
});

export default router;
