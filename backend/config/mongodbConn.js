import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

const connectDb = async() => {
    try {
        const conn = await mongoose.connect(uri);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
    } catch (e) {
        console.error(`❌ MongoDB Connection Error: ${e.message}`);
        process.exit(1);
    }
};

export default connectDb;