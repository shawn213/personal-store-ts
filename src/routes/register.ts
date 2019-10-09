import { Router } from 'express';
import { register } from '../controllers/userController';
const router = Router();

router.route('/')
  .get(register)
  .post(register);

export default router;
