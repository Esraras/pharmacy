import Store from '../models/Store.js';

export const getNearestStores = async (req, res, next) => {
  try {
    const stores = await Store.find().limit(6);
    res.json(stores);
  } catch (error) {
    next(error);
  }
};

export const getAllStores = async (req, res, next) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (error) {
    next(error);
  }
};