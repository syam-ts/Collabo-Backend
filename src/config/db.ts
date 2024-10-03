 import mongoose from 'mongoose'


const connectDB = async () => {
   await mongoose.connect(
    'mongodb+srv://syamnandhu3:Jl0sDaWLT1VeOwTA@collabo.z60ht.mongodb.net/?retryWrites=true&w=majority&appName=collabo'
  )
};


connectDB()
.then(() => {
    console.log("Database connection established!")
})
.catch((err: Error) => {
    console.log('Database cannot be connected!')
})


 