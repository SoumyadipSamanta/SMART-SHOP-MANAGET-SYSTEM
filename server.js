const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Define Cart Schema
const cartItemSchema = new mongoose.Schema({
  product: String,
  price: Number,
  quantity: Number,
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

// Add to cart
app.post('/api/cart', async (req, res) => {
  const { product, price, quantity } = req.body;

  let existing = await CartItem.findOne({ product });
  if (existing) {
    existing.quantity += quantity;
    await existing.save();
  } else {
    await CartItem.create({ product, price, quantity });
  }

  res.json({ message: '✅ Added to cart' });
});

// Get cart
app.get('/api/cart', async (req, res) => {
  const items = await CartItem.find();
  res.json(items);
});

// Clear cart (after payment)
app.post('/api/cart/clear', async (req, res) => {
  await CartItem.deleteMany({});
  res.json({ message: '✅ Cart cleared' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
