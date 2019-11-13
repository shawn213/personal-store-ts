import { Router } from 'express';
import { Order } from '../db/models/Order';

const router = Router();

router.route('/')
  .get((req, res) => {
    res.render('management/order');
  });

router.route('/m')
  .get((req, res) => {
    Order.findAll().then(orders => {
      res.json({ orders });
    });
  });

export default router;
