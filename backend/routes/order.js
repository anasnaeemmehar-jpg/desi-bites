import express from 'express';
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  getOrderStats,
  deleteOrder,
} from '../controllers/orderController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createOrder); // customer places order (public)
router.get('/', protectAdmin, getOrders); // admin views all orders
router.get('/stats', protectAdmin, getOrderStats);
router.get('/:id', getOrder); // customer can track their order by id (public)
router.put('/:id/status', protectAdmin, updateOrderStatus);
router.delete('/:id', protectAdmin, deleteOrder);

export default router;
