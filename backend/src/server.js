import express from 'express'
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import connectDb from '../config/mongodbConn.js';
import connectPG from '../config/postgresConn.js';
import authRoutes from '../routes/auth.route.js';
import userRoutes from '../routes/user.route.js';

const app = express();
const PORT = 3000;
const _dirname = path.dirname(fileURLToPath(import.meta.url));

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 45,
    standardHeaders: 'draft-8',
    legacyHeaders: false
})

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(_dirname, '..', 'public')));

app.set('views', path.join(_dirname, '..', 'views'));
app.set('view engine', 'ejs');

app.use( '/auth' , authRoutes, apiLimiter );
app.use( '/api/users' , userRoutes );

app.get('/', (req, res) => {
    res.render("index.ejs");
})

app.get('/styles', (req, res, next) => {
    console.log("CSS CONSTENT: ", req.url );
    next();
})

app.listen(PORT, async() => {
    await connectDb();
    await connectPG();
    console.log(`Server running at port ${PORT} visit: https://localhost:${PORT} `);
})  