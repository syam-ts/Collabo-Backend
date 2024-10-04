import jwt from 'jsonwebtoken'
import { User } from '../model/userMdl';

export const userAuth = async (req: any, res: any, next: any) => {

   try{
    const { token } = req.cookies;

    if(!token) {
        throw new Error('Token not valid')
    }

    const decodedObj = await jwt.sign(token ,'Collabo@Backend');

    const { _id }: any = decodedObj;
    const user = await User.findById(_id);

    if(!user) {
        throw new Error('User not found')
    } 

    req.user = user
    next();
   }
   catch(err: any) {
     res.status(404).send('Bad request' + err.message);
   }
}
