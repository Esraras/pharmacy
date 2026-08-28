import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    photo: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: [
      {
        author: String,
        rating: Number,
        comment: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);