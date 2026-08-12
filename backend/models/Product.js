const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String }, // e.g. "hot", "cold", "specialty"
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);