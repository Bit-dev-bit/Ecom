const express = require('express');
const router = express.Router();
const {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.route('/me').get(protect, getUserProfile);

module.exports = router;
