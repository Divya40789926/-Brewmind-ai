require('../config/dns'); // adjust path depending on file location
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  { name: "Caramel Latte", price: 180, image: "https://placehold.co/300x300?text=Caramel+Latte" },
  { name: "Cappuccino", price: 160, image: "https://placehold.co/300x300?text=Cappuccino" },
  { name: "Cold Brew", price: 190, image: "https://placehold.co/300x300?text=Cold+Brew" },
  { name: "Espresso", price: 120, image: "https://placehold.co/300x300?text=Espresso" },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Products seeded successfully');
  } catch (error) {
    console.error('Seeding failed:', error.message);
  } finally {
    mongoose.connection.close();
  }
}

seed();