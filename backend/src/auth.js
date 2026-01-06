import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from './config.js';

// Hash password
export const hashPassword = async (password) => {
  return await bcryptjs.hash(password, config.BCRYPT_ROUNDS);
};

// Compare password
export const comparePassword = async (password, hashedPassword) => {
  return await bcryptjs.compare(password, hashedPassword);
};

// Generate JWT token
export const generateToken = (userId) => {
  return jwt.sign({ userId }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE
  });
};

// Verify JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
