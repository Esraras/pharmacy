import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  hours: { type: String, default: '8AM - 5PM' },
  status: { type: String, enum: ['OPEN', 'CLOSE'], default: 'OPEN' },
  rating: { type: Number, default: 5 },
});

export default mongoose.model('Store', storeSchema);