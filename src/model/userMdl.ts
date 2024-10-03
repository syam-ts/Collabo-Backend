import { Schema, model } from 'mongoose'

const userSchema = new Schema({
            firstName: {
                type: String 
            }, 
            lastName: {
                type: String
            }, 
            emailId: {
                type: String
            },
            password: {
                type: String
            },
            age: {
                type: Number
            },
            gender: {
                type: String
           }
    });

 export const User = model('User', userSchema);

