import { Request, Response, NextFunction } from 'express';
import { Product } from '../db/models/Product';
import { Op } from 'sequelize';
import { isAjax } from '../services/checkTypes';

export const queryAll = (req: Request, res: Response) => {
  let user = req.session.user;
  let options = {};
  if (user != undefined) {
    console.log(user);
    if (user.permission > 0) {
      options = {
        where: {
          startDate: { [Op.lte]: new Date() },
          endDate: { [Op.gt]: new Date() }
        }
      }
    }
  }
  Product.findAll(options)
    .then(products => {
      if (isAjax(req)) {
        res.json({ products });
      } else {
        res.render('index', { products });
      }
    });
}
