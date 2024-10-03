 import mongoose from 'mongoose'


export const connectDB = async () => {
   await mongoose.connect(
    'mongodb+srv://syamnandhu3:Jl0sDaWLT1VeOwTA@collabo.z60ht.mongodb.net/collabo'
  )
};


 

 