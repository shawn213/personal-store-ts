import { Router } from 'express';
import { createOrder } from '../../controllers/checkout';

const rest = Router();

rest.route('/')
  .post(createOrder);

export default rest;
