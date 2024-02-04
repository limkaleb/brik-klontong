import express from 'express';
import {
  addCategory,
  addProduct,
  getProducts,
  getProduct,
  getProductsByCategory,
} from '../controllers/product.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.get('/category/:id', getProductsByCategory);
router.route('/').post(protect, addProduct);
router.route('/category').post(protect, addCategory);

export default router;
