import Product from '../models/Product.js';
import mongoose from 'mongoose';

export const getProducts = async (req, res, next) => {
  try {
    const { category, query, page = 1, limit = 12 } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (query) filter.name = { $regex: query, $options: 'i' };

    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.max(1, Number(limit) || 12);
    const skip = (pageNum - 1) * limitNum;

    const totalCount = await Product.countDocuments(filter);
    const products = await Product.find(filter).skip(skip).limit(limitNum);

    res.json({
      products,
      totalPages: Math.ceil(totalCount / limitNum),
      totalCount,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {

    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error("3. Hata Oluştu:", error);
    next(error);
  }
};