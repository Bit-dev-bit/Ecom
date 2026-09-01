const Product = require('../models/Product');

// @desc    Fetch all products (with search, filter, pagination)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    
    let query = {};
    
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }
    
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }
    
    if (req.query.rating) {
      query.rating = { $gte: Number(req.query.rating) };
    }

    let sort = {};
    if (req.query.sort) {
      if (req.query.sort === 'price_asc') sort.price = 1;
      if (req.query.sort === 'price_desc') sort.price = -1;
      if (req.query.sort === 'newest') sort.createdAt = -1;
      if (req.query.sort === 'rating') sort.rating = -1;
    } else {
      sort.createdAt = -1;
    }

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sort)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize), count });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById
};
