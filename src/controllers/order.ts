import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Order } from '../db/models/Order';

export const query = (req: Request, res: Response) => {
  let { userId, productId } = req.query;
  let where = {};
  if (userId && !productId) {
    where = {
      userId: userId
    }
  } else if (!userId && productId) {
    where = {
      products: { [Op.contains]: [{ id: productId }] }
    }
  } else if (userId && productId) {
    where = {
      [Op.or]: [{ userId }, { products: { [Op.contains]: [{ id: productId }] } }]
    }
  }
  let user = req.session.user;
  if (!user) {
    res.status(500).json({});
  } else if (user.authority === 0) {
    where['userId'] = user.userId;
    Order.findAll({
      where
    }).then(orders => {
      res.json({ orders });
    });
  }
}

export const queryAll = (req: Request, res: Response) => {
  Order.findAll().then(orders => {
    res.json({ orders });
  });
}

export const updateOrder = (req: Request, res: Response) => {
  let { id, status } = req.body;
  Order.findByPk(id).then(order => {
    order.update({
      status
    }).then(order => {
      res.json({ isOK: true });
    }).catch(e => {
      res.json({ isOK: false });
    })
  });
}

export const deleteOrder = (req: Request, res: Response) => {
  let id = req.body.id;
  Order.findByPk(id).then(order => {
    order.destroy().then(o => {
      res.json({ isOK: true });
    }).catch(e => {
      res.json({ isOK: false });
    });
  });
}
