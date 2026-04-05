const prisma = require('../prisma')

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.userId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: { include: { product: true } }, user: true },
      orderBy: { createdAt: 'desc' }
    })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { getOrders, getAllOrders }