import { Router } from 'express';
import { isLoggedIn } from '../middlewares/auth.js';
import { allBids, newBid } from '../controllers/bidControllers.js';

const router = Router();

//bid routes
router.post('/:itemId/bids', isLoggedIn, newBid);
router.get('/:itemId/bids', allBids)

export default router;