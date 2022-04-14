const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/', (req, res) => res.json({msg: 'Auth'}));
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
