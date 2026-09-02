import Store from '../models/Store.js';

const mockStores = [
  { _id: '1', name: 'Central Pharmacy', address: '123 Main St, City Center', phone: '+1-555-0101', rating: 4.8, hours: '8AM - 10PM' },
  { _id: '2', name: 'Health Hub', address: '456 Park Ave, Downtown', phone: '+1-555-0102', rating: 4.6, hours: '9AM - 9PM' },
  { _id: '3', name: 'MediCare Express', address: '789 Oak Rd, Suburbs', phone: '+1-555-0103', rating: 4.5, hours: '7AM - 11PM' },
  { _id: '4', name: 'Wellness Pharmacy', address: '321 Elm St, North District', phone: '+1-555-0104', rating: 4.9, hours: '8AM - 8PM' },
  { _id: '5', name: 'Quick Pharmacy 24/7', address: '654 Maple Dr, East End', phone: '+1-555-0105', rating: 4.3, hours: 'Open 24/7' },
  { _id: '6', name: 'Family Health Store', address: '987 Cedar Ln, West Side', phone: '+1-555-0106', rating: 4.7, hours: '8AM - 9PM' },
];

export const getNearestStores = async (req, res, next) => {
  try {
    res.json(mockStores.slice(0, 6));
  } catch (error) {
    next(error);
  }
};

export const getAllStores = async (req, res, next) => {
  try {
    res.json(mockStores);
  } catch (error) {
    next(error);
  }
};