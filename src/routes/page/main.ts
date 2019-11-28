import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/logout', (req, res) => {
  req.session.destroy(e => {
    if (!e) {
      res.render('index');
    }
  });
});

export default router;
