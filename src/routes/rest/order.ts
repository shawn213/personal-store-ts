import { Router } from 'express';
import { queryAll, query, updateOrder, deleteOrder } from '../../controllers/order';

const rest = Router();

rest.route('/')
  .get(query)
  .patch(updateOrder)
  .delete(deleteOrder);

rest.route('/1')
  .get(queryAll);

export default rest;
