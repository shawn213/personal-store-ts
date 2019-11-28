import { Router } from 'express';

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

router.use('/m/user', userManagement);
router.use('/m/order', orderManagement);
router.use('/m/product', productManagement);

router.use('/rest/user', userRest);
router.use('/rest/main', mainRest);
router.use('/rest/login', loginRest);
router.use('/rest/order', orderRest);
router.use('/rest/product', productRest);
router.use('/rest/checkout', checkoutRest);
router.use('/rest/register', registerRest);

export default router;
