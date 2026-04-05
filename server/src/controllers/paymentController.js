require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const prisma = require('../prisma')

const createCheckoutSession = async (req, res) => {
  try {
    const { items } = req.body
    const productIds = items.map(i => i.productId)
    const products = await prisma.product.findMany({ where: { id: { in: productIds } } })

    const lineItems = items.map(item => {
      const product = products.find(p => p.id === item.productId)
      return {
        price_data: {
          currency: 'usd',
          product_data: { name: product.name },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: item.quantity,
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      metadata: { userId: req.userId.toString(), items: JSON.stringify(items) }
    })

    res.json({ url: session.url })
  } catch (err) {
    console.log('Payment error:', err.message)
    res.status(500).json({ error: err.message })
  }
}

const handleSuccess = async (req, res) => {
  try {
    const { session_id } = req.query
    const session = await stripe.checkout.sessions.retrieve(session_id)
    if (session.payment_status === 'paid') {
      const items = JSON.parse(session.metadata.items)
      const userId = parseInt(session.metadata.userId)
      const products = await prisma.product.findMany({ where: { id: { in: items.map(i => i.productId) } } })
      const total = items.reduce((sum, item) => {
        const product = products.find(p => p.id === item.productId)
        return sum + product.price * item.quantity
      }, 0)
      const order = await prisma.order.create({
        data: {
          userId,
          total,
          status: 'paid',
          stripeId: session.id,
          items: {
            create: items.map(item => {
              const product = products.find(p => p.id === item.productId)
              return { productId: item.productId, quantity: item.quantity, price: product.price }
            })
          }
        }
      })
      res.json({ order })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { createCheckoutSession, handleSuccess }