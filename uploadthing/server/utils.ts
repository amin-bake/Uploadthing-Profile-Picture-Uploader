// server/utils.ts
import User from '../models/User'

// Function to get a user by email
export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
};

// Function to create a new user
export const createUser = async (userData: { email: string; password: string; profilePicture?: string }) => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
