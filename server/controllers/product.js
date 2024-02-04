import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';
import { responseHandler } from '../utils/response_handler.js';

const { Category, Product, User } = new PrismaClient();

// @desc    Add category
// @route   POST /api/products/category
// @access  Private
const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const user = await User.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (user) {
    const newCategory = await Category.create({
      data: { name },
    });
    res.status(201).json(responseHandler(newCategory));
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Add product
// @route   POST /api/products/
// @access  Private
const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, image, categoryId } = req.body;
  const user = await User.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (user) {
    const newProduct = await Product.create({
      data: {
        name,
        description,
        price,
        image,
        categoryId,
      },
    });
    res.status(201).json(responseHandler(newProduct));
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get products with pagination
// @route   Get /api/products/
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  // const {} = req.query;
  const response = await Product.findMany({
    include: {
      category: true,
    },
  });

  res.json(responseHandler(response));
});

// @desc    Get products by category
// @route   GET /api/products/category/:id
// @access  Public
const getProductsByCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const response = await Product.findMany({
    where: {
      categoryId: Number(id),
    },
    include: {
      category: true,
    },
  });

  res.json(responseHandler(response));
});

// @desc    Get product details
// @route   GET /api/products/:id
// @access  Public
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const response = await Product.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      category: true,
    },
  });

  res.json(responseHandler(response));
});

export {
  addCategory,
  addProduct,
  getProducts,
  getProduct,
  getProductsByCategory,
};
