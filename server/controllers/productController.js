import Product from '../models/Product.js';

const mockProducts = [
  { _id: '1', name: 'Aspirin 500mg', category: 'Medicine', price: 5.99, photo: 'https://via.placeholder.com/150?text=Aspirin', description: 'Pain reliever' },
  { _id: '2', name: 'Vitamin C 1000mg', category: 'Heart', price: 8.99, photo: 'https://via.placeholder.com/150?text=VitaminC', description: 'Immune booster' },
  { _id: '3', name: 'Blood Pressure Monitor', category: 'Heart', price: 45.00, photo: 'https://via.placeholder.com/150?text=BP', description: 'Digital monitor' },
  { _id: '4', name: 'Skin Cream SPF 50', category: 'Skin', price: 15.99, photo: 'https://via.placeholder.com/150?text=Cream', description: 'Sunscreen lotion' },
  { _id: '5', name: 'Antibiotic Ointment', category: 'Skin', price: 6.49, photo: 'https://via.placeholder.com/150?text=Ointment', description: 'Wound care' },
  { _id: '6', name: 'Thermometer Digital', category: 'Medicine', price: 12.99, photo: 'https://via.placeholder.com/150?text=Thermo', description: 'Fast reading' },
  { _id: '7', name: 'Metformin 500mg', category: 'Medicine', price: 9.99, photo: 'https://via.placeholder.com/150?text=Metformin', description: 'Diabetes control' },
  { _id: '8', name: 'Statins 20mg', category: 'Heart', price: 14.99, photo: 'https://via.placeholder.com/150?text=Statins', description: 'Cholesterol reducer' },
];

export const getProducts = async (req, res, next) => {
  try {
    const { category, query, page = 1, limit = 12 } = req.query;
    let filtered = mockProducts;

    if (category) filtered = filtered.filter(p => p.category === category);
    if (query) filtered = filtered.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

    const totalCount = filtered.length;
    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.max(1, Number(limit) || 12);
    const products = filtered.slice((pageNum - 1) * limitNum, pageNum * limitNum);

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
      res.status(404);
      throw new Error('Product not found');
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};