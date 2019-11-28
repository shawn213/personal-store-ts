import { Router } from 'express';
import { init, serverReply } from '../../controllers/checkout';

const router = Router();

router.route('/')
  .get(init)
  .post(serverReply);

export default router;
