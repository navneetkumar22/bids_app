import { Router } from 'express';
import { allItems, createItem, deleteItem, getItem, updateItem } from '../controllers/itemControllers.js';
import { customRole, isLoggedIn } from '../middlewares/auth.js';
import { upload } from '../services/multerConfig.js';

const router = Router();

//item routes
router.post('/', isLoggedIn, upload.single('image'), createItem);
router.get('/', allItems);
router.get('/:id', getItem);
router.post('/:id', isLoggedIn, customRole('user', 'admin'), updateItem);
router.delete('/:id', isLoggedIn, customRole('user', 'admin'), deleteItem);


export default router;