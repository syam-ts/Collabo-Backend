import express, { json } from 'express';
import { connectDB } from './config/db';
const app = express();
import userRouter from './routes/userRouter'
import profileRouter from './routes/profileRouter'
import requrestRouter from './routes/requestRouter'

import cookieParser from 'cookie-parser' 

const PORT: number = 3000;
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

