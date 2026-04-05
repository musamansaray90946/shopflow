import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold text-gray-900">
        Shop<span className="text-blue-600">Flow</span>
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">Shop</Link>
        {user?.role === 'admin' && (
          <Link to="/admin" className="text-sm text-purple-600 font-medium">Admin</Link>
        )}
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Hi, {user.name}</span>
            <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">Logout</button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900">Login</Link>
            <Link to="/register" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Register</Link>
          </div>
        )}
        <Link to="/cart" className="relative">
          <span className="text-2xl">🛒</span>
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{itemCount}</span>
          )}
        </Link>
      </div>
    </nav>
  )
}