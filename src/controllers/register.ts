import { Request, Response } from 'express';
import { User } from '../db/models/User';
import _ from 'lodash';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const register = async (req: Request, res: Response) => {
  let authority = 0;
  let { userId, password, email, username, cellPhone } = req.body;
  if (_.isEqual(userId, 'admin')) {
    authority = 99;
  }
  password = bcrypt.hashSync(password, saltRounds);
  User.findOne({
    where: {
      userId
    }
  }).then(user => {
    if (!user) {
      User.create({
        userId, username, password, email, cellPhone, authority
      }).then(user => {
        res.json({ isOK: true, user });
      });
    } else {
      res.json({ isOK: false, msg: '用戶帳號已註冊' });
    }
  })
}
