import express from 'express';
import authenticate from '../middleware/authenticate';
import productController from '../controller/product.controller';

const router = express.Router();

router.get("/", authenticate, productController.getAllProducts);
router.get("/id/:id", authenticate, productController.findProductById);

export default router;