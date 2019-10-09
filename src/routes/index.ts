import { Router } from 'express';
import { queryAll } from '../controllers/mainController';

const router = Router();

/* GET home page. */
router.get('/', queryAll);

router.post('/logout', (req, res) => {
  req.session.destroy(e => {
    if (!e) {
      res.render('index');
    }
  });
});

export default router;
