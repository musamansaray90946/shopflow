const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const { getOrders, getAllOrders } = require('../controllers/orderController')

router.get('/', auth, getOrders)
router.get('/all', auth, admin, getAllOrders)

module.exports = router