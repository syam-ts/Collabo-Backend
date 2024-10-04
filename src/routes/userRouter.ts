import express from 'express';
import { User } from '../model/userMdl'

const Router = express.Router();

Router.get('/feed', (req, res) => {
  res.send('Router defined');
});

Router.post('/signup', async (req, res) => {

    console.log('The req : ', req.body)
    const user = new User(req.body);

    await user.save();
    res.send('User Added successfully!')

});


export default Router;