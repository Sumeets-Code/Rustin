import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        // required: true
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"orderItems",
    }],
    orderDate: {
        type: Date,
        required: true,
        defaul: Date.now()
    },
    deliveryDate: {
        type: Date,
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"addresses"
    },
    paymentDatails: {
        paymentMethod: {
            type: String
        },
        transactionId: {
            type: String
        },
        paymentId: {
            type: String
        },
        paymentStatus: {
            type: String,
            default: "PENDING"
        }
    },
    totalPrice: {
        type: Number,
        required: true
    },
    totalDiscountedPrice: {
        type: Number, 
        required: true, 
        default: 0
    },
    discounts: {
        type: Number, 
        required: true, 
        default: 0
    },
    orderStatus: {
        type: String,
        required: true,
        default: "PENDING"
    },
    totalItems: {
        type: Number, 
        required: true, 
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Orders = mongoose.model( "orders", orderSchema );

export default Orders;