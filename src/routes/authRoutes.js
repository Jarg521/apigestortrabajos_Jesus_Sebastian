const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registro
router.post('/register', authController.registrar);

// Login
router.post('/login', authController.login);

module.exports = router;
