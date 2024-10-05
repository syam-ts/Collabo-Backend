import express from 'express';
import { userAuth } from '../middleware/auth';

const router = express.Router();

router.post('/sendConnctionRequest',userAuth, async (req: any, res: any) => {
    const user = req.user;
    
    res.send(user.fistName + ' send the connect request');
  });


  export default router;