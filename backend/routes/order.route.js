import express from 'express';
import authenticate from '../middleware/authenticate';
import orderController from '../controller/order.controller';

const router = express.Router();

router.post("/", authenticate, orderController.createdOrder);
router.get("/:id", authenticate, orderController.findOrderById);
router.get("/user", authenticate, orderController.orderHistory);

export default router;