const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Review = require('./models/Review');
const Cart = require('./models/Cart');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    await Cart.deleteMany();

    const createdUsers = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123', // will be hashed by pre-save if we used save(), but insertMany bypasses it. Wait, insertMany bypasses hooks! I need to save them manually or hash here.
        role: 'admin',
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      }
    ]);

    // We must hash passwords for users created via insertMany or use User.create
    await User.deleteMany(); // Delete the unhashed ones
    
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123', 
      role: 'admin',
    });

    const regularUser = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    // Sample Products
    const products = [
      {
        name: 'Student Laptop Pro 15"',
        slug: 'student-laptop-pro-15',
        description: 'A high-performance laptop perfect for coding, design, and taking notes. Lightweight with all-day battery life.',
        price: 899.99,
        discountPrice: 799.99,
        category: 'Electronics',
        brand: 'TechBrand',
        images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stock: 15,
        rating: 4.5,
        numReviews: 12,
        featured: true,
        specifications: [{ name: 'Processor', value: 'Intel i7' }, { name: 'RAM', value: '16GB' }]
      },
      {
        name: 'Noise Cancelling Headphones',
        slug: 'noise-cancelling-headphones',
        description: 'Block out dorm noise and focus on your studies with these premium wireless headphones.',
        price: 199.99,
        category: 'Electronics',
        brand: 'AudioTech',
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stock: 30,
        rating: 4.8,
        numReviews: 25,
        featured: true,
      },
      {
        name: 'Classic College Hoodie',
        slug: 'classic-college-hoodie',
        description: 'Stay warm on campus with this ultra-comfortable, fleece-lined hoodie.',
        price: 49.99,
        category: 'Clothing',
        brand: 'CampusStyle',
        images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stock: 100,
        rating: 4.0,
        numReviews: 8,
        featured: true,
      },
      {
        name: 'Smart Notebook',
        slug: 'smart-notebook',
        description: 'Reusable notebook that syncs with your phone to keep your notes organized.',
        price: 34.99,
        category: 'Stationery',
        brand: 'WriteSmart',
        images: ['https://images.unsplash.com/photo-1571506165871-ee72a35bc9d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stock: 50,
        rating: 4.2,
        numReviews: 45,
      },
      {
        name: 'Desk Organizer',
        slug: 'desk-organizer',
        description: 'Keep your study desk clutter-free with this multi-compartment organizer.',
        price: 24.99,
        discountPrice: 19.99,
        category: 'Hostel Essentials',
        brand: 'HomeNeat',
        images: ['https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stock: 40,
        rating: 4.6,
        numReviews: 19,
      },
      {
        name: 'Scientific Calculator',
        slug: 'scientific-calculator',
        description: 'Essential for engineering and math students. Approved for exams.',
        price: 15.99,
        category: 'Stationery',
        brand: 'CalcMax',
        images: ['https://images.unsplash.com/photo-1574607383476-f517f260d30b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stock: 80,
        rating: 4.9,
        numReviews: 120,
      }
    ];

    await Product.insertMany(products);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    await Cart.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
