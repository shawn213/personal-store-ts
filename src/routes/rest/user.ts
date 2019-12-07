import { Router } from 'express';
import { queryAll, querySelect, changeIdentity, reset } from '../../controllers/user';

const router = Router();

router.route('/1')
  .get(queryAll);

router.route('/2')
  .get(querySelect);

router.route('/')
  .put(changeIdentity)
  .patch(reset);

export default router;
