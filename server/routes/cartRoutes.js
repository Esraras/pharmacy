import express from 'express';
import { getCart, updateCart, checkoutCart } from '../controllers/cartController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getCart);
router.put('/update', updateCart);
router.post('/checkout', checkoutCart);

export default router;