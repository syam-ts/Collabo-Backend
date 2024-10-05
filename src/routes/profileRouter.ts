import express from 'express';
import { userAuth } from '../middleware/auth';
const router = express.Router();


router.get('/profile',userAuth,  async (req: any, res: any) => {

    try {
      
        const user = req.user; 
        res.send(user);
      }
       catch(err: any) {
        res.status(401).send('Error : ' + err.message);
      }
  });


export default router;