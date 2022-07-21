import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { userRouter } from './routes/user.routes.js';
import { postRouter } from './routes/post.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import 'dotenv/config';

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api', userRouter);
app.use('/api', postRouter);
app.use(errorMiddleware);

const start = async () => {
    try {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    app.listen(8000, () => {
        console.log('listening on port 8000');
    });
    } catch (e) {
        console.log(e.message);
    }
}


start();