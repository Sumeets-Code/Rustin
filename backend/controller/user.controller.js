import userService from "../services/user.service.js";

const getUserProfile= async (req, res) => {
    
    try {
        const jwtToken = req.headers.authorization?.split(" ")[1];

        if(!jwtToken) {
            return res.status(404).send({error: "token not found"});
        }

        const user = await userService.getProfileByToken(jwtToken);
        return res.status(200).send(user);

    } catch (err) {
        console.error('Service error:', err.message);
        return res.status(500).send({error: err.message});
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).send(users);
    } catch (err) {
        return res.status(500).send({error: err.message});
    }
}

export default { getUserProfile, getAllUsers };