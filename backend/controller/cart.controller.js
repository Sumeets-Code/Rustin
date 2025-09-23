import cartService from "../services/cart.service";

const findUserCart = async (req, res) => {
    const user = req.user;
    try {
        const cart = await cartService.findUserCart(user._id);
        return res.status(200).send(cart);
    } catch (err) {
        return res.status(500).send({error: err.message});
    }
}

const addToCart = async (req, res) => {
    const user = req.user;
    try {
        const cartItem = await cartService.addCartItem(user._id, req.body);
        return res.status(200).send(cartItem);
    } catch (err) {
        return res.status(500).send({error: err.message});
    }
}

export default { findUserCart, addToCart };