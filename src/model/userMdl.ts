import { Schema, model } from 'mongoose';
import validator from 'validator';

const userImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...'; // Use your full base64 image

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
      default: userImage,
      validate(value: string) {
        if(!validator.isURL(value)) {
          throw new Error('Invalid photo URL ' + value)
        }
        }
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
