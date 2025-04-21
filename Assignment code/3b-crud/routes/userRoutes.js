const express = require('express');
const { registerUser, loginUser, getUsers, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Get all users
router.get('/users', getUsers);

// Update user by ID
router.put('/users/:id', updateUser);

// Delete user by ID
router.delete('/users/:id', deleteUser);

module.exports = router;
