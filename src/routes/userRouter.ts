import express from 'express';
import { User } from '../model/userMdl';
import { validateSignUpData } from '../utils/validation';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userAuth } from '../middleware/auth';
const router = express.Router();


router.post('/signup', async (req, res) => {

   try{
    validateSignUpData(req);
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


router.post('/login', async(req, res) => {

  try{

   const { email, password } = req.body;
   const user = await User.findOne({email: email});

   if(!user) {
    throw new Error('Invalid Credentials');
   }
   
   const isValidPassword = await bcrypt.compare(password, user.password);

   if(isValidPassword) {

    const token = await jwt.sign({ _id: user._id}, "Collabo@Backend", { expiresIn: "7d"});
    
    res.cookie("token", token);
    res.send('Login Succesful');
   } else {
    throw new Error('Invalid Credentials');
   }
  }
  catch(err: any) {
    res.status(400).send("Error : " + err.message);
    }
});

router.post('/logout',userAuth , (req, res: any) => {

  try{

     res.cookie("token", null).send('Logout Successfull');
   }
  catch(err: any) {
    res.send('Errot' + err.message);
  }
});


router.get('/feed', userAuth, async (req, res) => {
 
    const user = await User.find();
    console.log("The users : ", user);

    res.send('Router defined');
  });


  router.delete('/feed', userAuth, async (req, res) => {
    try{

        const userId = req.body.id;

        const findUser = await User.findByIdAndDelete({_id: userId});
        res.send("User deleted successfully!");
    }catch(err: any) {
          res.status(401).send('Could not delete user')
    }
  })


  router.patch('/feed',userAuth, async (req, res) => {
    try{

        const userId = req.body.id;
        const update = req.body 
        console.log("firsts naem", {firstName: update})

        const findUser = await User.findByIdAndUpdate({_id: userId}, update);
        res.send("User updated successfully!");
    }catch(err: any) {
          res.status(401).send('Could not update user')
    }
  });

  


export default router;