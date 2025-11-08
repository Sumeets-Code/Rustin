import express from 'express';
import authenticate from '../middleware/authenticate.js';
import orderController from '../controller/order.controller.js';

const router = express.Router();

router.post("/", authenticate, orderController.createdOrder);
router.get("/:id", authenticate, orderController.findOrderById);
router.get("/user", authenticate, orderController.orderHistory);

export default router;