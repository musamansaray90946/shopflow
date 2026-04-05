import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const API = 'http://localhost:5002/api'

export default function Success() {
  const [searchParams] = useSearchParams()
  const { clearCart } = useCart()
  const { token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (sessionId && token) {
      axios.get(`${API}/payments/success?session_id=${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(() => clearCart())
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center max-w-md">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order confirmed!</h1>
        <p className="text-gray-500 mb-8">Thank you for your purchase. Your order has been placed successfully.</p>
        <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition">
          Continue shopping
        </button>
      </div>
    </div>
  )
}