import cartItemSevice from "../services/cartItem.sevice";

const updateCartItem = async (req, res) => {
    const user = req.user;
    try {
        const updateCartItem = await cartItemSevice.updateCartItem(user._id, req.params.id, req.body);
        return res.status(200).send(updateCartItem);
    } catch (err) {
        return res.status(500).send({error: err.message})
    }
}

const removeCartItem = async (req, res) => {
    const user = req.user;
    try {
        await cartItemSevice.removeCartItem(user._id, req.params.id);
        return res.status(200).send({message: "Cart item removed successfully"});
    } catch (err) {
        return res.status(500).send({error: err.message})
    }
}

export default { updateCartItem, removeCartItem };
