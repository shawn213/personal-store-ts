import { Request, Response, NextFunction } from 'express';
import { User } from '../db/models/User';
import { isAjax } from '../services/checkTypes';
import { Op } from 'sequelize';
import _ from 'lodash';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const login = async (req: Request, res: Response) => {
  if (isAjax(req)) {
    let { userId, password } = req.body;
    let user = await User.findOne({
      where: {
        userId
      }
    });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({ user });
    } else {
      res.statusCode = 401;
      res.json({ error: '' });
    }
  } else {
    res.render('login');
  }
}

export const register = (req: Request, res: Response) => {
  if (isAjax(req)) {
    let authority = 0;
    let { userId, password, email, username, cellPhone } = req.body;
    if (_.isEqual(userId, 'admin')) {
      authority = 99;
    }
    password = bcrypt.hashSync(password, saltRounds);
    User.create({
      userId, username, password, email, cellPhone, authority
    }).then(user => {
      res.json({ user });
    });
  } else {
    res.render('register');
  }
}

export const query = (req: Request, res: Response) => {
  if (isAjax(req)) {
    User.findAll().then(users => {
      res.json({ users });
    });
  } else {
    res.render('management/user');
  }
}

export const reset = (req: Request, res: Response) => {
  if (isAjax(req)) {
    let { user } = req.body;
    let newPW = bcrypt.hashSync(user.userId, saltRounds);
    User.findOne({
      where: {
        id: user.id
      }
    }).then(user => {
      user.update({ password: newPW }).then(newUser => {
        res.json({ newUser });
      })
    });
  }
}
