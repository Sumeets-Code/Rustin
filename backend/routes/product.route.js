import express from 'express';
import authenticate from '../middleware/authenticate.js';
import productController from '../controller/product.controller.js';

const router = express.Router();

router.get("/", authenticate, productController.getAllProducts);
router.get("/id/:id", authenticate, productController.findProductById);

export default router;