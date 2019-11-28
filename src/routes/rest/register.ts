import { Router } from 'express';
import { register } from '../../controllers/register';

const router = Router();

router.route('/')
  .post(register);

export default router;
