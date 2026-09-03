import Cart from '../models/Cart.js';
import Order from '../models/Order.js';
import mongoose from 'mongoose';

export const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ userId: req.user._id, items: [] });
    }
    res.json({
      items: cart.items || [],
      userId: cart.userId
    });
  } catch (error) {
    next(error);
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => (item.product._id || item.product).toString() === productId
    );

    if (itemIndex > -1) {
      // Mevcut adede yeni eklenmek isteneni ilave ediyoruz
      const newQuantity = cart.items[itemIndex].quantity + quantity;

      if (newQuantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = newQuantity;
      }
    } else if (quantity > 0) {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    const updatedCart = await Cart.findById(cart._id).populate('items.product');
    
    res.json({
      items: updatedCart.items || [],
      userId: updatedCart.userId
    });
  } catch (error) {
    next(error);
  }
};

export const checkoutCart = async (req, res, next) => {
  try {
    const { shippingInfo, paymentMethod, total, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderItems = items.map((item) => ({
      product: item.productId || item.product,
      quantity: item.quantity,
      price: item.price || 0
    }));

    const order = await Order.create({
      userId: req.user._id,
      items: orderItems,
      shippingInfo: shippingInfo || { 
        name: 'Default User', 
        email: 'default@mail.com', 
        phone: '0000000000', 
        address: 'Default Address' 
      },
      paymentMethod: paymentMethod || 'Cash On Delivery',
      total: total || 0,
      status: 'pending',
    });

    // Sepeti temizle
    await Cart.findOneAndUpdate({ userId: req.user._id }, { items: [] });

    res.status(201).json({
      message: 'Order placed successfully',
      orderId: order._id,
      order,
    });
  } catch (error) {
    console.error("Checkout Error Detail:", error); // Terminalde tam hatayı görmek için
    next(error);
  }
};