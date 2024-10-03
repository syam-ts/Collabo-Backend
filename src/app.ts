import express from 'express';
import { connectDB } from './config/db';
import { User } from './model/userMdl'
const app = express();

app.post('/signup', async (req, res) => {

    const user = new User ({
        firstName: 'Syam',
        lastName: 'nandhu',
        email: 'Syamnan@gami.com',
        password: 'syam@123'
    });

    await user.save();
    res.send('User Added successfully!')

});

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

