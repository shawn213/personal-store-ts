import { Router } from 'express';
import { queryAll } from '../../controllers/main';

const rest = Router();

rest.route('/')
  .get(queryAll);

rest.delete('/logout', (req, res) => {
  req.session.destroy(e => {
    if (!e) {
      res.json({ isOK: true });
    }
  });
});

export default rest;
