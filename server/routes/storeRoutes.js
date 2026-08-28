import express from 'express';
import { getNearestStores, getAllStores } from '../controllers/storeController.js';

const router = express.Router();

router.get('/nearest', getNearestStores);
router.get('/', getAllStores);

export default router;