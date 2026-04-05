const express = require('express')
const cors = require('cors')
require('dotenv').config()
const path = require('path')

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/payments', require('./routes/payments'))

app.get('/', (req, res) => {
  res.json({ message: 'ShopFlow API is running' })
})

const PORT = process.env.PORT || 5002
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))