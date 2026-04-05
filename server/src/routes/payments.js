const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { createCheckoutSession, handleSuccess } = require('../controllers/paymentController')

router.post('/create-checkout-session', auth, createCheckoutSession)
router.get('/success', auth, handleSuccess)

module.exports = router