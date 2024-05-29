import { Router } from 'express';
import { login, profile, register } from "../controllers/userControllers.js";
import { isLoggedIn } from '../middlewares/auth.js';
const router = Router();

// user routes
router.post('/register', register);
router.post('/login', login);
router.get('/profile', isLoggedIn, profile);

export default router;