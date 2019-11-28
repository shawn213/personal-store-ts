import { Router } from 'express';
import { queryAll, querySelect, changeIdentity } from '../../controllers/user';

const router = Router();

router.route('/1')
  .get(queryAll);

router.route('/2')
  .get(querySelect);

router.route('/')
  .put(changeIdentity);

export default router;
