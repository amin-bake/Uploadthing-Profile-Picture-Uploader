// pages/api/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser, getUserByEmail } from '../../server/utils'; // Import your utility function to create a user

const secretKey = 'test141'; 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }
  
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    console.log({email, password});
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await createUser({
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ email: newUser.email }, secretKey, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error during registration', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default handler;
