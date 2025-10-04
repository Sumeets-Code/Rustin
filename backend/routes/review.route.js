import express from 'express';
import authenticate from '../middleware/authenticate';
import reviewController from '../controller/review.controller';

const router = express.Router();

router.get("/product/:productId", authenticate, reviewController.getAllReviews);
router.post("/create", authenticate, reviewController.createReview);

export default router;