const userController = require('../controllers/userController')
const express = require('express');
const router = express.Router();

router.get('/users/currentUser', userController.getCurrentUserData)

router.post('/register', userController.register);

router.post('/login', userController.login);

module.exports = router;