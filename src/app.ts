import express, { json } from 'express';
import { connectDB } from './config/db';
const app = express();
import userRouter from './routes/userRouter'
import cookieParser from 'cookie-parser' 


app.use(json())
app.use(cookieParser());
app.use('/', userRouter);


connectDB()
.then(() => {
    console.log("Database connection established!");

    app.listen(3000, () => {
        console.log('Server successfully running on port 3000!');
    });
})
.catch((err: Error) => {
    console.log('Database cannot be connected!');
});

