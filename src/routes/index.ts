import { Router } from 'express';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import JwtUtil from '../services/utils/JwtUtil';

import mainRouter from './page/main';
import productRouter from './page/product';
import loginRouter from './page/login';
import registerRouter from './page/register';
import checkoutRouter from './page/checkout';
import orderRouter from './page/order';

import userManagement from './page/management/user';
import orderManagement from './page/management/order';
import productManagement from './page/management/product';

import userRest from './rest/user';
import mainRest from './rest/main';
import loginRest from './rest/login';
import orderRest from './rest/order';
import productRest from './rest/product';
import checkoutRest from './rest/checkout';
import registerRest from './rest/register';

const router = Router();

router.use('/', mainRouter);
router.use('/login', loginRouter);
router.use('/order', orderRouter);
router.use('/product', productRouter);
router.use('/checkout', checkoutRouter);
router.use('/register', registerRouter);
router.use('/startup', (req, res) => {
  res.json({ isOK: true });
});

router.use('/m/user', userManagement);
router.use('/m/order', orderManagement);
router.use('/m/product', productManagement);

router.use(['/rest/:path', '/rest/:path/:sub'], (req, res, next) => {
  let authorization = req.header('Authorization');
  let { path, sub } = req.params;
  if (!authorization && (path === 'login' || path === 'register' || path === 'main')) {
    next();
  } else {
    let [bearer, token] = _.split(authorization, ' ');
    if (bearer === 'Bearer') {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            res.status(403).json({});
          } else {
            next(err);
          }
        } else {
          let user = JwtUtil.decode(decoded);
          req.session.user = user;
          next();
        }
      });
    } else {
      res.status(401).send('沒權限');
    }
  }
});

router.use('/rest/user', userRest);
router.use('/rest/main', mainRest);
router.use('/rest/login', loginRest);
router.use('/rest/order', orderRest);
router.use('/rest/product', productRest);
router.use('/rest/checkout', checkoutRest);
router.use('/rest/register', registerRest);

export default router;
