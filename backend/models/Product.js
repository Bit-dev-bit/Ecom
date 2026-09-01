const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  discountPrice: {
    type: Number,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  images: [{
    type: String, // URL strings
    required: true
  }],
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  specifications: [{
    name: String,
    value: String
  }],
  featured: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

// Indexing for search
productSchema.index({ name: 'text', description: 'text', category: 'text' });
productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
