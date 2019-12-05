import { Request, Response } from 'express';
import { User } from '../db/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export const login = (req: Request, res: Response) => {
  let { userId, password } = req.body;
  User.findOne({
    where: {
      userId
    }
  }).then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      let token = genJWT(req, user);
      res.json({ user: { userId, authority: user.authority }, token });
    } else {
      res.status(401);
    }
  });
}

function genJWT(req: Request, user: User) {
  let { id, userId, username, cellPhone, email, authority } = user;
  let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  return jwt.sign({
    userId, username, cellPhone, email, authority
  }, process.env.JWT_SECRET, {
    issuer: fullUrl,
    expiresIn: '30m',
    subject: id
  });
}
