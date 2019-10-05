import { Router } from 'express';
import { login } from '../controllers/loginController';
import { queryAll } from '../controllers/mainController';

const router = Router();

/* GET home page. */
router.get('/', queryAll);

router.route('/login')
  .get(login)
  .post(login);

export default router;
