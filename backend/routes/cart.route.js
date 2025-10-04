import express from 'express';
import authenticate from '../middleware/authenticate';
import cartController from '../controller/cart.controller';

const router = express.Router();

router.get("/", authenticate, cartController.findUserCart);

router.put("/add", authenticate, cartController.addToCart);

export default router;