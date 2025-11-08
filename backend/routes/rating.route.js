import express from 'express';
import authenticate from '../middleware/authenticate.js';
import ratingController from '../controller/rating.controller.js';

const router = express.Router();

router.get("/product/:productId", authenticate, ratingController.getAllRating);
router.put("/create", authenticate, ratingController.createRating);

export default router;