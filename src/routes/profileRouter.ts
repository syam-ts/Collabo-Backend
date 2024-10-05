import express from 'express';
import { userAuth } from '../middleware/auth';
const router = express.Router();
import { validateProfileData } from '../utils/validation'


router.get('/profile',userAuth,  async (req: any, res: any) => {

    try {
      
        const user = req.user; 
        res.send(user);
      }
       catch(err: any) {
        res.status(401).send('Error : ' + err.message);
      }
  });


  router.patch('/profile/edit', userAuth, async (req: any, res: any) => {

    try{

        if(!validateProfileData(req)) {
            throw new Error('Invalid Edit Requrest');
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key: any) => {
            loggedInUser[key] = req.body[key];
        })
      

       await loggedInUser.save();
     
        res.json({ message: `${loggedInUser.firstName} your profile was updated successfully`, 
           data: loggedInUser
        })

    }
    catch(err: any) {
        res.send('Error : '+ err.message);
    }
  })


export default router;