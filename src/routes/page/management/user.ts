import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('management/user');
});

export default router;
