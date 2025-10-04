import express from 'express';
import authenticate from '../middleware/authenticate';
import ratingController from '../controller/rating.controller';

const router = express.Router();

router.get("/product/:productId", authenticate, ratingController.getAllRating);
router.put("/create", authenticate, ratingController.createRating);

export default router;