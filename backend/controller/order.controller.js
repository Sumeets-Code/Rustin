import orderService from "../services/order.service";

const createdOrder = async (req, res) => {
    const user = req.user;
    try {
        let createdOrder = await orderService.createOrder(user, req.body);
        return res.status(200).send(createdOrder);
    } catch (err) {
        return res.status(500).send({error: err.message});
    }
}

const findOrderById = async (req, res) => {
    const user = req.user;
    try {
        let foundOrders = await orderService.findOrderById(req.params.id);
        return res.status(200).send(foundOrders);
    } catch (err) {
        return res.status(500).send({error: err.message});
    }
}


const orderHistory = async (req, res) => {
    const user = req.user;
    try {
        let userOrders = await orderService.userOrderHistory(user._id);
        return res.status(200).send(userOrders);
    } catch (err) {
        return res.status(500).send({error: err.message});
    }
}

export default { createdOrder, findOrderById, orderHistory };