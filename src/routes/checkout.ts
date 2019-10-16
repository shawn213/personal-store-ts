import { Router, Request, Response } from 'express';

const router = Router();

router.route('/')
  .get((req, res) => {
    res.render('checkout');
  });

export default router;
