const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  { name: "Caramel Latte", price: 180, image: "https://placehold.co/300x300?text=Caramel+Latte", category: "hot" },
  { name: "Cappuccino", price: 160, image: "https://placehold.co/300x300?text=Cappuccino", category: "hot" },
  { name: "Cold Brew", price: 190, image: "https://placehold.co/300x300?text=Cold+Brew", category: "cold" },
  { name: "Espresso", price: 120, image: "https://placehold.co/300x300?text=Espresso", category: "hot" },
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log('Products seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedDB();