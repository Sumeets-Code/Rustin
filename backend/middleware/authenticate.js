import jwtProvider from '../config/jwtProvider.js'
import userService from '../services/user.service.js';

const authenticate = async(req, res, next) => {
    try {
        const token = req.header.authorization?.split(" ")[1];
        if(!token) {
            // throw new Error("No Token found");
            return res.status(404).send({error: "token not found"});
        }

        const userId = jwtProvider.getIdByToken(token);
        const user = userService.findUserById(userId);
        req.user = user;

    } catch (err) {
        return res.status(500).send({error: err.message});
    }
    next();
}

export default { authenticate };