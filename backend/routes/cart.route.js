import express from 'express';
import authenticate from '../middleware/authenticate.js';
import cartController from '../controller/cart.controller.js';

const router = express.Router();

router.get("/", authenticate, cartController.findUserCart);

router.put("/add", authenticate, cartController.addToCart);

export default router;