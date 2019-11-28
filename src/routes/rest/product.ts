import { Router } from 'express';
import { queryById, queryAll, querySelect, updateProduct, deleteProduct, createProduct } from '../../controllers/product';

const rest = Router();

rest.post('/', createProduct);

rest.route('/i/:id')
  .get(queryById)
  .patch(updateProduct)
  .delete(deleteProduct);
rest.route('/1').get(queryAll);
rest.route('/2').get(querySelect);

export default rest;
