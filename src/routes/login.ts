import { Router } from 'express';
import { login } from '../controllers/userController';
const router = Router();

router.route('/')
  .get(login)
  .post(login);

export default router;
