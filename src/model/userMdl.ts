import { Schema, model } from 'mongoose';
import validator from 'validator';

const userImage = 'data:image/jpeg;base64,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'; 

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      unique: true,
      minlength: [4, 'First name must be at least 4 characters long'],
      maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      minlength: [4, 'Last name must be at least 4 characters long'],
      maxlength: [50, 'Last name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: 'Invalid email address',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      validate(value: string) {
      if(!validator.isStrongPassword(value)) {
        throw new Error('Please enter strong password ' + value)
      }
      }
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    photoUrl: {
      type: String,
      default: userImage
    },
    about: {
      type: String,
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);


export const User = model('User', userSchema);
