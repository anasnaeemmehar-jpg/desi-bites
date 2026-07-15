import express from 'express';
import {
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customerController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protectAdmin, getCustomers);
router.get('/:id', protectAdmin, getCustomer);
router.put('/:id', protectAdmin, updateCustomer);
router.delete('/:id', protectAdmin, deleteCustomer);

export default router;
