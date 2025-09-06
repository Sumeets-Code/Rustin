import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectPG = async() => {
    try {
        const pgdb =  new pg.Client({
            user: "postgres",
            host: "localhost",
            database: "rustin",
            password: process.env.PG_PASSWORD,
            port: process.env.PG_PORT
        });
        console.log(`✅ PG Connected: ${pgdb.host}`);
    } catch (e) {
        console.error(`❌ PG Connection Error: ${e.message}`);
        process.exit(1);
    }
}

export default connectPG;