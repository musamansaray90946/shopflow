const prisma = require('../prisma')

const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query
    const where = {}
    if (category) where.category = category
    if (search) where.name = { contains: search, mode: 'insensitive' }
    const products = await prisma.product.findMany({ where, orderBy: { createdAt: 'desc' } })
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getProduct = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: parseInt(req.params.id) } })
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body
    const image = req.file ? `/uploads/${req.file.filename}` : null
    const product = await prisma.product.create({
      data: { name, description, price: parseFloat(price), category, stock: parseInt(stock), image }
    })
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body
    const data = { name, description, price: parseFloat(price), category, stock: parseInt(stock) }
    if (req.file) data.image = `/uploads/${req.file.filename}`
    const product = await prisma.product.update({ where: { id: parseInt(req.params.id) }, data })
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: parseInt(req.params.id) } })
    res.json({ message: 'Product deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct }