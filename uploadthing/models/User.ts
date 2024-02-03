// models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

interface UserDocument extends Document {
  email: string;
  password: string;
  profilePicture: string;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
