import express from 'express';
import authenticate from '../middleware/authenticate';
import cartItemController from '../controller/cartItem.controller';

const router = express.Router();

router.put("/:id", authenticate, cartItemController.updateCartItem);
router.delete("/:id", authenticate, cartItemController.removeCartItem);

export default router;