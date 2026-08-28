import Product from '../models/Product.js';

export const getProducts = async (req, res, next) => {
  try {
    const { category, query, page = 1, limit = 12 } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (query) filter.name = { $regex: query, $options: 'i' };

    const count = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .limit(Number(limit))
      .skip((page - 1) * limit);

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      totalCount: count,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};