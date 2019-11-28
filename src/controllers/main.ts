import { Request, Response } from 'express';
import { Product } from '../db/models/Product';
import { Op } from 'sequelize';

export const queryAll = (req: Request, res: Response) => {
  let user = req.session.user;
  let options = {};
  if (user != undefined) {
    if (user.authority == 0) {
      options = {
        where: {
          startDate: { [Op.lte]: new Date() },
          endDate: { [Op.gt]: new Date() }
        }
      };
    }
  } else {
    options = {
      where: {
        startDate: { [Op.lte]: new Date() },
        endDate: { [Op.gt]: new Date() }
      }
    };
  }
  Product.findAll(options)
    .then(products => {
      res.json({ products });
    });
}
