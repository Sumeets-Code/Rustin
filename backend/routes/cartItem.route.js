import express from 'express';
import authenticate from '../middleware/authenticate.js';
import cartItemController from '../controller/cartItem.controller.js';

const router = express.Router();

router.put("/:id", authenticate, cartItemController.updateCartItem);
router.delete("/:id", authenticate, cartItemController.removeCartItem);

export default router;