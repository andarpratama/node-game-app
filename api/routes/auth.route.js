const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authErrorHanddler = require('../middlewares/auth.errorhandler');

router.get('/', (req, res) => res.json({msg: 'Auth'}));
router.post('/register', authController.register);
router.post('/login', authController.login);
router.use(authErrorHanddler)

module.exports = router;
