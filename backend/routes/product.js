import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protectAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', protectAdmin, upload.single('image'), createProduct);
router.put('/:id', protectAdmin, upload.single('image'), updateProduct);
router.delete('/:id', protectAdmin, deleteProduct);

export default router;
