import { Request, Response, NextFunction } from 'express';
import { User } from '../db/models/User';

export const login = async (req: Request, res: Response) => {
  if (req.headers.accept.search('json') > -1) {
    let { username, password } = req.body;
    let user = await User.findOne({
      where: {
        username
      }
    });
    if (user && user.password == password) {
      res.json({ user });
    } else {
      res.statusCode = 401;
      res.json({ error: '' });
    }
  } else {
    res.render('login');
  }
}
