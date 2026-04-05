import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const API = 'http://localhost:5002/api'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart()
  const { token } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!token) return navigate('/login')
    setLoading(true)
    try {
      const items = cart.map(item => ({ productId: item.id, quantity: item.quantity }))
      const res = await axios.post(`${API}/payments/create-checkout-session`, { items }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      window.location.href = res.data.url
    } catch (err) {
      alert('Checkout failed. Please try again.')
    }
    setLoading(false)
  }

  if (cart.length === 0) return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <div className="text-6xl mb-4">🛒</div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-6">Add some products to get started</p>
      <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">Browse products</button>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Your cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                {item.category === 'Electronics' ? '🔌' : item.category === 'Fashion' ? '👟' : item.category === 'Home' ? '🏠' : item.category === 'Sports' ? '⚽' : '📦'}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">-</button>
                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">+</button>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-400 hover:text-red-600 mt-1">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 h-fit">
          <h2 className="font-semibold text-gray-900 mb-4">Order summary</h2>
          <div className="space-y-2 mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm text-gray-600">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-4 mb-6">
            <div className="flex justify-between font-semibold text-gray-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button onClick={handleCheckout} disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-50">
            {loading ? 'Processing...' : 'Checkout with Stripe'}
          </button>
        </div>
      </div>
    </div>
  )
}