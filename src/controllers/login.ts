import { Request, Response } from 'express';
import { User } from '../db/models/User';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import JwtUtil from '../services/utils/JwtUtil';

export const login = (req: Request, res: Response) => {
  let { userId, password } = req.body;
  User.findOne({
    where: {
      userId
    }
  }).then(user => {
    if (!user) {
      res.json({ isOK: false, msg: res.__('__message.userId.notFound') });
    } else if (!bcrypt.compareSync(password, user.password)) {
      res.json({ isOK: false, msg: res.__('__message.password.fail') });
    } else {
      let issuer = req.protocol + '://' + req.get('host') + req.originalUrl;
      let token = JwtUtil.generate(user, issuer);
      res.json({ isOK: true, user: { userId, authority: user.authority }, token });
    }
  });
}
