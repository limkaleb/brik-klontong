import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';
import { bcryptCompare, encrypt, generateToken } from '../utils/auth-util.js';

const { User } = new PrismaClient();

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findUnique({
    where: {
      email,
    },
  });

  if (user && (await bcryptCompare(password, user.passwordDigest))) {
    generateToken(res, user.id);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401).json({
      message: 'Invalid email or password',
    });
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log('test create: ', req.body);
  const userExists = await User.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    data: {
      name,
      email,
      passwordDigest: await encrypt(password),
    },
  });

  if (user) {
    generateToken(res, user.id);

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json({
      message: 'Invalid user data',
    });
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (user) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404).json({
      message: 'User not found',
    });
  }
});

export { authUser, registerUser, logoutUser, getUserProfile };
