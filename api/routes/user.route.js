const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const auth = require('../middlewares/authJwt')

router.use(auth.authentication)
router.use(auth.authorization)
router.get('/', userController.getAll)
router.get('/detail', userController.detail)
router.put('/:id', userController.update)
router.delete('/:id', userController.delete)
router.post('/attack/:id', userController.attack)


module.exports = router