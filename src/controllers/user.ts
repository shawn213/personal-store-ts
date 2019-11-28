import { Request, Response } from 'express';
import { User } from '../db/models/User';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import { send } from '../services/gemail';
import { Op } from 'sequelize';

const saltRounds = 10;

export const reset = (req: Request, res: Response) => {
  let { user } = req.body;
  let newPW = bcrypt.hashSync(user.cellPhone, saltRounds);
  User.findOne({
    where: {
      id: user.id
    }
  }).then(user => {
    user.update({ password: newPW }).then(newUser => {
      res.json({ newUser });
    });
  });
}

export const queryAll = (req: Request, res: Response) => {
  let user = req.session.user;
  if (user) {
    User.findAll({
      where: {
        id: {
          [Op.ne]: user.id
        },
        authority: {
          [Op.lt]: user.authority
        }
      }
    }).then(users => {
      res.json({ users });
    });
  } else {
    res.json({ users: [] });
  }
}

export const querySelect = (req: Request, res: Response) => {
  User.findAll({
    attributes: ['userId', 'username']
  }).then(users => {
    res.json({ users });
  });
}

export const sendMail = (req: Request, res: Response) => {
  send().then(info => {
    res.json({ info });
  }).catch(e => {
    res.status(500).json({ e });
  });
}

export const changeIdentity = (req: Request, res: Response) => {
  let { id, authority } = req.body;
  User.findByPk(id).then(user => {
    user.update({ authority: authority }).then(user => {
      res.json({ isOK: true });
    });
  });
}
