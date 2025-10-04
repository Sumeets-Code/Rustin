import express from 'express';
import orderController from '../controller/order.controller';
import authenticate from '../middleware/authenticate';
import adminOrderController from '../controller/adminOrder.controller';

const router = express.Router();

router.get("/", authenticate, adminOrderController.getAllOrders );

router.put("/:orderId/confirmed", authenticate, adminOrderController.confirmedOrder);
router.put("/:orderId/deliver", authenticate, adminOrderController.deliveredOrder);
router.put("/:orderId/cancel", authenticate, adminOrderController.cancelOrder);
router.put("/:orderId/delete", authenticate, adminOrderController.deleteOrder);
router.put("/:orderId/ship", authenticate, adminOrderController.shipOrder);

export default router;