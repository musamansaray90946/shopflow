const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
})
const upload = multer({ storage })

router.get('/', getProducts)
router.get('/:id', getProduct)
router.post('/', auth, admin, upload.single('image'), createProduct)
router.put('/:id', auth, admin, upload.single('image'), updateProduct)
router.delete('/:id', auth, admin, deleteProduct)

module.exports = router