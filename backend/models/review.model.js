import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"products",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Reviews = mongoose.model( "reviews", reviewSchema );

export default Reviews;
