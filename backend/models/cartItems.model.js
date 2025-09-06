import mongoose from "mongoose";

const cartItemsSchema = new mongoose.Schema({
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"cart",
        required:true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"products",
        required: true
    },
    size: {type: String, required: true},
    quantity: {type: Number, required: true, default: 1},
    price: {type: Number, required: true, default: 0},
    discountedPrice: {type: Number, required: true, default: 0},
    discounts: {type: Number, required: true, default: 0},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: true
    }
})

const CartItems = mongoose.model( "cartItems", cartItemsSchema );

export default CartItems;