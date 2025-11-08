import Reviews from "../models/review.model.js";
import productService from "./product.service.js";

async function createReview(reqData, user) {
    const product = await productService.findProductById(reqData.productId);

    const review = new Reviews({
        userId: user._id,
        product: product._id,
        review: reqData.review,
        createdAt: new Date(),
    })

    await product.save();
    return await review.save();
}

async function getAllReviews(productId) {
    const product = await productService.findProductById(reqData.productId);
    
    return await Reviews.find({product: product}).populate("userId")
}

export default { createReview, getAllReviews }