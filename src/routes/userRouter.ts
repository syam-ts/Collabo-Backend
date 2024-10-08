import express from 'express';
import { User } from '../model/userMdl';
import { validateSignUpData } from '../utils/validation';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userAuth } from '../middleware/auth';
import ConnectionRequest from '../model/requestMdl';
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

  console.log("Login Enter")
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


  router.get('/user/requests/recieved', userAuth, async (req: any, res: any) => {

    try {
      
      const loggedInUser = req.user;
   
      const connectionRequest = await ConnectionRequest.find({
        reciever: loggedInUser._id,
        status: 'intrested'
      }).populate('sender', ['firstName', 'lastName', 'gender', 'imageUrl', 'age', 'about', 'skills']);

   
      res.json({ 
        message: 'Data fetched successfully', 
        data: connectionRequest
      });


    } catch (err: any) {
      res.status(400).json({ message: err.message});
    }
  });
  

  router.get('/user/connections', userAuth, async (req: any, res: any) => {

    try{


      const loggedInUser = req.user;
      const connectionRequest = await ConnectionRequest.find({
        $or: [
          {sender: loggedInUser._id, status: 'accepted'},
          {reciever: loggedInUser._id, status: 'accepted'}
        ]
      }).populate('sender', [
        'firstName', 'lastName', 'gender', 'imageUrl', 'age', 'about', 'skills'
      ]).populate('reciever',[ 'firstName', 'lastName', 'gender', 'imageUrl', 'age', 'about', 'skills']);

      const data = connectionRequest.map((row: any) => 
      {
        if(row.sender._id.toString() === loggedInUser._id.toString()) {
            return row.reciever;
        }
            return row.sender
      }
      );

      res.json({data});

    }
    catch(err: any) {
      res.status(400).json({message: err.message});
    }
  });


  router.get('/feed', userAuth, async (req: any, res) => {
 

    try {

      const loggedInUser = req.user;

      const page: number = parseInt(req.query.page) | 1;
      let limit: number = parseInt(req.query.limit) | 10;
      limit = limit > 50 ? 50 : limit;
      const skip: number = (page - 1) * limit;

      const connectionRequest = await ConnectionRequest.find({
        $or:[
         {
          sender: loggedInUser._id
         },
         {
          reciever: loggedInUser._id
         }
        ]
      }).select(' sender reciever');


      const hideUsersFromFeed = new Set();

      connectionRequest.forEach((req: any) => {

        hideUsersFromFeed.add(req.sender.toString())
        hideUsersFromFeed.add(req.reciever.toString())
      })

      const users = await User.find({
        $and: [
          { _id: { $nin: Array.from(hideUsersFromFeed)}},
          { _id: { $ne: loggedInUser._id}}
        ]
      }).select(' sender reciever').skip(skip).limit(limit);





      res.json(connectionRequest);


    }
    catch(err: any) {
      res.status(400).json({message: err.message});
    }

  });


export default router;