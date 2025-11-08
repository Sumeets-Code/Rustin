import Address from "../models/address.model.js";
import Orders from "../models/order.model.js";
import OrderItem from "../models/orderItems.model.js";
import cartService from "./cart.service.js";



async function createOrder(user, shipAddress) {
    let address;

    if(shipAddress._id) {
        let isExist = await Address.findById(shipAddress._id);
        address = isExist;
    } else {
        address = new Address(shipAddress);
        address.user = user;
        await address.save();

        user.addresses.push(address);
        await user.save();
    }

    const cart = await cartService.findUserCart(user._id);
    const orderItems = [];
    
    for(const item of cart.cartItems) {
        const orderItem = new OrderItem({
            price: item.price,
            product: item.product,
            discountedPrice: item.discountedPrice,
            size: item.size,
            quantity: item.quantity,
            userId: item.userId
        })

        const createdOrderItem = await orderItem.save();
        orderItems.push(createdOrderItem);
    }

    const createdOrder = new Orders({
        user,
        orderItems,
        totalPrice: cart.totalPrice,
        totalDiscountedPrice: cart.totalDiscountedPrice,
        discounts: cart.discounts,
        totalItems: cart.totalItems,
        shippingAddress: address,
    })

    const saveOrder = createOrder.save();
    return saveOrder;
}

async function findOrderById(orderId) {
    const order = await Orders.findById(orderId)
    .populate("user")
    .populate({path:"orderItems", populate:{path:"product"}})
    .populate("shippingAddress");

    if(!order) {
        throw new Error("Order not found");
    }

    return order;
}

async function userOrderHistory(userId) {
    try {
        const orders = await Orders.find({user: userId, orderStatus: "PLACED"})
        .populate({path: "orderItems", populate: {path: "product"}}).lean();

        return orders;

    } catch (err) {
        console.error(`Error fetching all orders: ${err.message}`);
        throw err;
    }
}

async function  getAllOrders() {
    return await Orders.find().populate({path: "orderItems", populate: {path: "product"}})
    .lean();
}

async function deleteOrder(orderId) {
    const oreder = await findOrderById(orderId);
    await Orders.findByIdAndDelete(oreder._id);
}

async function placeOrder(orderId) {
    const order = await findOrderById(orderId);
    order.orderStatus = "PLACED";
    order.paymentDatails.status = "COMPLETED";

    return await order.save();
}

async function confirmed(orderId) {
    const order = await findOrderById(orderId);
    order.orderStatus = "CONFIRMED";

    return await order.save();
}

async function shippedOrder(orderId) {
    const order = await findOrderById(orderId);
    order.orderStatus = "SHIPPED";

    return await order.save();
}

async function delivered(orderId) {
    const order = await findOrderById(orderId);
    order.orderStatus = "DELIVERED";

    return await order.save();
}

async function cancelOrder(orderId) {
    const order = await findOrderById(orderId);
    order.orderStatus = "CANCELLED";

    return await order.save();
}

export default { createOrder, findOrderById, userOrderHistory, cancelOrder, delivered, shippedOrder, placeOrder, deleteOrder, confirmed, getAllOrders };