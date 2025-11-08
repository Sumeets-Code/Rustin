import userService from "../services/user.service.js"
import jwtProvider from "../config/jwtProvider.js"
import cartService from "../services/cart.service.js";
import bcrypt from 'bcrypt';

const register = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        const jwt = jwtProvider.generateToken(user._id);

        await cartService.createCart(user);

        return res.status(200).send({jwt, message: "register success"});

    } catch (err) {
        return res.status(500).send({error: err.message});
    }
}

const login = async (req, res) => {
    const {password, email} = req.body;

    try {
        const userExist = await userService.findUserByEmail(email);
        if(!userExist) {
            return res.status(404).send({error_location: "login Controller" ,message: `user not found with email: ${email}`});
        }

        const isPasswordVaild = await bcrypt.compare(password, userExist.password);
        if(!isPasswordVaild) {
            return res.status(401).send({message: "Invaild password"});
        }

        const jwt = jwtProvider.generateToken(userExist._id);
        return res.status(200).send({jwt, message: "login success"});

    } catch (err) {
        return res.status(500).send({error: err.message});
    }
}

export default { register, login };