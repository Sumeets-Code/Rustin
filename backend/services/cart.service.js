import Cart from "../models/cart.model.js";
import CartItems from "../models/cartItems.model.js";
import Product from "../models/product.model.js";

const createCart = async (user) => {
    try {
        const cart = new Cart({user});
        const createCart = await cart.save();

        return createCart;
    } catch (err) {
        console.error(`Cart creation error: ${err.message}`);
        throw err;
    }
}

async function findUserCart(userId) {
    try {
        let cart = await Cart.findOne({user: userId});

        let cartItems = await CartItems.findOne({cart: cart._id}).populate("products");

        cart.cartItems = cartItems;

        let totalPrice = 0;
        let totalDiscountPrice = 0;
        let totalItem = 0;

        for (let cartItems of cart.cartItems) {
            totalPrice += cartItems.price;
            totalDiscountPrice += cartItems.discountedPrice;
            totalItem += cartItems.quantity;
        }

        cart.totalPrice = totalPrice;
        cart.totalItems = totalItem;
        cart.discounts = totalPrice - totalDiscountPrice;

        return cart;

    } catch (err) {
        console.error(`finding User cart error: ${err.message}`);
        throw err;
    }
} 

async function addCartItem(userId, req) {
    try {
        const cart = await Cart.findOne({user: userId});
        const product = await Product.findById(req.productId);

        const isPresent = await CartItems.findOne({cart: cart._id, product: product._id, userId});

        if(!isPresent) {
            const cartItem = new CartItems({
                product: product._id,
                cart: cart._id,
                price: product.price,
                quantity: 1,
                userId,
                size: req.size,
                discountedPrice: product.discountedPrice,
            });
            const createdItem =  await cartItem.save();

            cart.cartItems.push(createdItem);
            await cart.save();
            return  "Item added to cart";

        }

    } catch (err) {
        console.error(`Error adding item to cart: ${err.message}`);
        throw err;
    }
}

export default { createCart, findUserCart, addCartItem };