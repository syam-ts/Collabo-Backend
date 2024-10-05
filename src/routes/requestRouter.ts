import express from 'express';
import { userAuth } from '../middleware/auth';
import ConnectionRequest from '../model/requestMdl'
import { User } from '../model/userMdl';

const router = express.Router();

router.post('/request/send/:status/:reciever',userAuth, async (req: any, res: any) => {
    
  try{
    

     type UserId = String
     const sender: UserId = req.user._id;
     const reciever: UserId = req.params.reciever;
     const status: 'intrested' | 'ignored' = req.params.status;

     const allowedStatus = ['ignored', 'intrested'];

     const userExists = await User.findById(reciever);

     if(!userExists) {

      return res.status(400).json({message: 'User not found'});

     }


     if(!allowedStatus.includes(status)) {
       return res.json({message: 'Invalid status type'});
     }

     const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          {
            sender: sender,
            reciever: reciever
          },
           {
            reciever: sender,
            sender: reciever
          }
        ]
     });

     if(existingConnectionRequest) {
       return res.status(400).json({message: 'Connecion request already send'});
     }

    
     const connectionRequest = new ConnectionRequest({
      sender, 
      reciever,
      status
     });

     const data = await connectionRequest.save();

     res.json({
      message: "Connection request send successfully",
      data
     })

  }
  catch(err: any) {
    res.status(400).send("ERROR: "+ err.message)
  }
  });

 


  export default router;