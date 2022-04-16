const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const errHanddler = require('../middlewares/errorHanddler');

router.get('/', (req, res) => res.json({msg: 'Auth'}));
router.post('/register', authController.register);
router.post('/login', authController.login);
router.use(errHanddler)

module.exports = router;
