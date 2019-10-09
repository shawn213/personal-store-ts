import { Router } from 'express';
import { query } from '../controllers/userController';

const router = Router();

router.route('/')
  .get(query)
  .patch();

export default router;
