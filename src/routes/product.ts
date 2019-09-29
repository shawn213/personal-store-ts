import { Router } from 'express';
import { query, updateProduct, createProduct, deleteProduct } from '../controllers/productController';

const router = Router();

router.route('/')
  .get((req, res) => {
    res.render('management/product');
  })
  .post(createProduct);

router.get('/m/:id', (req, res) => {
  res.render('management/product');
});

router.route('/:id')
  .get(query)
  .patch(updateProduct)
  .delete(deleteProduct);

export default router;
