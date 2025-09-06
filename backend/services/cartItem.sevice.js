import CartItems from "../models/cartItems.model";
import userService from "./user.service";


async function updateCartItem(userId, cartItemId, cartItemData) {
    try {
        const item = await findCartItemById(cartItemId);

        if(!item) {
            throw new Error("cart item not found: ", cartItemId)
        }

        const user = await userService.findUserById(item.userId);
        if(!user) {
            throw new Error("user not found: ", userId);
        }

        if(user._id.toString() === userId.toString()) {
            item.quantity = cartItemData.quantity;
            item.price = item.quantity * item.product.price;
            item.discountedPrice = item.quantity * item.product.discountedPrice;
            
            const updateCartItem = await item.save();

            return updateCartItem;
        } else {
            throw new Error("You cannot update this cart item");
        }
    } catch (err) {
        console.error(`Error Updating cart item: ${err.message}`);
        throw err;
    }
}

async function removeCartItem(userId, cartItemId) {
    try {
        const item = await findCartItemById(cartItemId);

        if(!item) {
            throw new Error("cart item not found: ", cartItemId)
        }

        const user = await userService.findUserById(userId);
        if(!user) {
            throw new Error("user not found: ", userId);
        }

        if(user._id.toString() === item.userId.toString()) {
            await CartItems.findByIdAndDelete(item);
        } else {
            throw new Error("You can't remove this cart item");
        }

    } catch (err) {
        console.error(`Error Removing cart item: ${err.message}`);
        throw err;
    }
}

async function findCartItemById(cartItemId) {
    try {
        const cartItem = await CartItems.findById(cartItemId);
        if(!cartItem) {
            throw new Error("Cart Item not found");
        }

        return cartItem;
    } catch (err) {
        console.error(`Error Finding cart item: ${err.message}`);
        throw err;
    }
}

export default { updateCartItem, removeCartItem, findCartItemById }