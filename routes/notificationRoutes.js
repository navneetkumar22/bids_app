import { Router } from 'express';
import { allNotifications, updateNotifications } from '../controllers/notificationControllers.js';
import { isLoggedIn } from '../middlewares/auth.js';

const router = Router();

//notifications routes
router.get('/', isLoggedIn, allNotifications);
router.post('/mark-read', isLoggedIn, updateNotifications)

export default router;