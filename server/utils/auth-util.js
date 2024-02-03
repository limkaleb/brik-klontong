import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SALT_ROUND = 10;

export const encrypt = async (password) => bcrypt.hash(password, SALT_ROUND);

export const bcryptCompare = async (plainPassword, hash) =>
  bcrypt.compare(plainPassword, hash);

// export const validatePassword = (password) =>
//   password != null &&
//   password.length >= 6 &&
//   config.PASSWORD_REGEX.test(password);

export const generateToken = (res, userId) => {
  console.log('useridd: ', userId);
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  console.log('tokenn: ', token);

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  console.log('tokenn 22: ', token);
};
