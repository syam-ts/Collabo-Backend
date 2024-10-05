import express from 'express';
import { userAuth } from '../middleware/auth';
import ConnectionRequest from '../model/requestMdl'

const router = express.Router();

router.post('/request/send/:status/:reciever',userAuth, async (req: any, res: any) => {
    
  try{
    

     type UserId = String
     const sender: UserId = req.user._id;
     const reciever: UserId = req.params.reciever;
     const status: 'intrested' | 'ignored' = req.params.status;

     const allowedStatus = ['ignored', 'intrested'];

     if(!allowedStatus.includes(status)) {

      console.log("The data :  enter here")
       return res.json({message: 'Invalid status type'});
     }
     console.log('The stat', req.params.status)
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