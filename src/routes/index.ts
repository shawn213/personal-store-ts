import {Router} from 'express';
import * as product from '../controllers/productController';

const router = Router();

/* GET home page. */
router.get('/', product.queryAll);

export default router;
