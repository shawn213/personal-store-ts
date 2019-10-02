import { Router } from 'express';
import * as product from '../controllers/productController';
import { login } from '../controllers/loginController';

const router = Router();

/* GET home page. */
router.get('/', product.queryAll);

router.route('/login')
  .get(login)
  .post(login);

export default router;
