import Rating from "../models/rating.model";
import productService from "./product.service";

async function createRating(req, user) {
    const product = await productService.findProductById(req.productId);
    
    const rating = new Rating({
        userId: user._id,
        product: product._id,
        rating: req.rating,
        createdAt: new Date()
    })

    return await rating.save();
}

async function getProductRating(productId) {
    return await Rating.find({product: productId});
}

export default { createRating, getProductRating };