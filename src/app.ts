import express, { json } from 'express';
import { connectDB } from './config/db';
import userRouter from './routes/userRouter'
import profileRouter from './routes/profileRouter'
import requrestRouter from './routes/requestRouter'
import cookieParser from 'cookie-parser' 
import morgan from 'morgan'
import cors from 'cors'


const app = express();
const PORT: number = 7777;
app.use(morgan('dev'));
app.use(cors())
app.use(json())
app.use(cookieParser());


//routes
app.use('/', userRouter);
app.use('/', profileRouter);
app.use('/', requrestRouter);

 
connectDB()
.then(() => {
    console.log("Database connection established!");
    app.listen(PORT, () => {
        console.log(`Server successfully running on port ${PORT}`);
    });
})
.catch((err: Error) => {
    console.log('Database cannot be connected!');
});

