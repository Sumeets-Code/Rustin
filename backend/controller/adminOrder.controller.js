import orderService from "../services/order.service"

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        return res.status(200).send(orders);
    } catch (err) {
        return res.status(500).send({error: err.message})
    }
}

const shipOrder = async (req, res) => {
    const orderId = req.body.orderId;
    try {
        const orders = await orderService.shippedOrder(orderId);
        return res.status(200).send(orders);
    } catch (err) {
        return res.status(500).send({error: err.message});
    }
}

const confirmedOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.confirmed(orderId);
        return res.status(200).send(orders);
    } catch (err) {
        return res.status(500).send({error: err.message})
    }
}

const cancelOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.cancelOrder(orderId);
        return res.status(200).send(orders);
    } catch (err) {
        return res.status(500).send({error: err.message})
    }
}

const deliveredOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.delivered(orderId);
        return res.status(200).send(orders);
    } catch (err) {
        return res.status(500).send({error: err.message})
    }
}

const deleteOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.deleteOrder(orderId);
        return res.status(200).send(orders);
    } catch (err) {
        return res.status(500).send({error: err.message})
    }
}

export default { getAllOrders, confirmedOrder, deleteOrder, deliveredOrder, cancelOrder, shipOrder }