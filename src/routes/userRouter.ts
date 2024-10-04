import express from 'express';
import { User } from '../model/userMdl'
import validateSingUpData from '../utils/validation'
import bcrypt from 'bcrypt'

const Router = express.Router();



Router.post('/signup', async (req, res) => {

   try{
    validateSingUpData(req);
    
    const {firstName, lastName, email, password } = req.body;
    const salt: number = 10;

    const passwordHash = await bcrypt.hash(password, salt);

 
    
    const user = new User({
        firstName, 
        lastName,
        email,
        password: passwordHash
    });

    await user.save();
    res.send('User Added successfully!')
   }
   catch(err: any) {
    res.status(400).send('ERROR : ' + err.message)
   }

});


Router.get('/feed', async (req, res) => {

 
    const user = await User.find();
    console.log("The users : ", user);

    res.send('Router defined');
  });


  Router.delete('/feed', async (req, res) => {
    try{

        const userId = req.body.id;

        const findUser = await User.findByIdAndDelete({_id: userId});
        res.send("User deleted successfully!");
    }catch(err: any) {
          res.status(401).send('Could not delete user')
    }
  })


  Router.put('/feed', async (req, res) => {
    try{

        const userId = req.body.id;
        const update = req.body 
        console.log("firsts naem", {firstName: update})

        const findUser = await User.findByIdAndUpdate({_id: userId}, update);
        res.send("User updated successfully!");
    }catch(err: any) {
          res.status(401).send('Could not update user')
    }
  })

export default Router;