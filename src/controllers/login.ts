import { Request, Response } from 'express';
import { User } from '../db/models/User';
import bcrypt from 'bcrypt';

export const login = (req: Request, res: Response) => {
  let { userId, password } = req.body;
  User.findOne({
    where: {
      userId
    }
  }).then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      res.json({ user });
    } else {
      res.status(401).json({ message: res.__('login.fail', res.__('password.error')) });
    }
  });
}
