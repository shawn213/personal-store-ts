import { Router } from 'express';

const router = Router();

router.route('/')
  .get((req, res) => {
    res.render('management/order');
  });

export default router;
