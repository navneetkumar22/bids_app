import { Router } from 'express';
import { forgetPassword, login, profile, register, resetPassword } from "../controllers/userControllers.js";
import { isLoggedIn } from '../middlewares/auth.js';
const router = Router();

// user routes
router.post('/register', register);
router.post('/login', login);
router.get('/profile', isLoggedIn, profile);

//reset password
router.post('/password/forgot', forgetPassword);
router.post('/password/reset/:resetToken', resetPassword);

export default router;