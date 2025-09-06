import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { getIdByToken } from '../config/jwtProvider.js';

const createUser = async(userData) => {
    try {        
        let {firstName, lastName, email, password} = userData;
        const isUserExist = await User.findOne({email});

        if(isUserExist) {
            throw new Error(`User Exists with email: ${email}`);
        }

        password = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            firstName, lastName, email, password
        });
        
        console.log(`User Created ${user}`);

        return user;

    } catch (err) {
        console.error(`User creation error: ${err.message}`);
        throw err;
    }
}

const findUserById = async(userId)=>{
    try {
        const user = await User.findById(userId)
        // .populate("address");                        if this is empty it will give err - FindBYId error: Schema hasn't been registered for model "addresses". Use mongoose.model(name, schema)
        if(!user) {
            throw new Error(`User not found with id: ${userId}`)
        }
        return user;

    } catch (err) {
        console.error(`FindBYId error: ${err.message}`);
        throw err;
    }
}

const findUserByEmail = async(userEmail)=> {
    try {
        const user = await User.findOne({email: userEmail});
        if(!user) {
            throw new Error(`User not found with email: ${userEmail}`)
        }
        return user;
        
    } catch (err) {
        console.error(`FindBYEmail error: ${err.message}`);
        throw err;
    }
}

const getProfileByToken = async(token)=> {
    try {
        const userId = getIdByToken(token);
        console.log(userId);

        const user = await findUserById(userId);
        if(!user) {
            throw new Error(`User not found with id: ${userId}`)
        }
        return user;

    } catch (err) {
        console.error(`getProfile error: ${err.message}`);
        throw err;
    }
}

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (err) {
        console.error(`All users Fetch error: ${err.message}`);;
        throw err;
    }
}

export default { createUser, findUserById, findUserByEmail, getProfileByToken, getAllUsers };