import express from 'express';
import authenticate from '../middleware/authenticate';
import productController from '../controller/product.controller';

const router = express.Router();

router.get("/", authenticate, productController.getAllProducts);
router.get("/:id", authenticate, productController.findProductById);

router.post("/", authenticate, productController.createProduct);
router.post("/creates", authenticate, productController.createMultipleProduct);
router.delete("/:id", authenticate, productController.deleteProduct);
router.put("/:id", authenticate, productController.updateProduct);

export default router;