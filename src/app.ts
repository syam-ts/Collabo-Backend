import express from 'express';
require('./config/db')
const app = express();



app.listen(3000, () => {
    console.log('Server successfully running on port 3000!')
});