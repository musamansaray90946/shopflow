import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="bg-gray-100 h-48 flex items-center justify-center text-5xl">
        {product.category === 'Electronics' ? '🔌' :
         product.category === 'Fashion' ? '👟' :
         product.category === 'Home' ? '🏠' :
         product.category === 'Sports' ? '⚽' : '📦'}
      </div>
      <div className="p-4">
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{product.category}</span>
        <h3 className="font-semibold text-gray-900 mt-2 mb-1">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add to cart
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">{product.stock} in stock</p>
      </div>
    </div>
  )
}