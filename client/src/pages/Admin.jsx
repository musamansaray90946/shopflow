import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5002/api'

export default function Admin() {
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name: '', description: '', price: '', category: 'Electronics', stock: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!user || user.role !== 'admin') return navigate('/')
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const res = await axios.get(`${API}/products`)
    setProducts(res.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(`${API}/products`, form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessage('Product added successfully!')
      setForm({ name: '', description: '', price: '', category: 'Electronics', stock: '' })
      fetchProducts()
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to add product')
    }
    setLoading(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    await axios.delete(`${API}/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    fetchProducts()
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Panel</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Add new product</h2>
          {message && <p className="text-sm mb-4 p-3 rounded-lg bg-blue-50 text-blue-700">{message}</p>}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" placeholder="Product name" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <textarea placeholder="Description" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
            <input type="number" placeholder="Price" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
            <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home</option>
              <option>Sports</option>
            </select>
            <input type="number" placeholder="Stock" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} required />
            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white rounded-xl py-2.5 text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50">
              {loading ? 'Adding...' : 'Add product'}
            </button>
          </form>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Products ({products.length})</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {products.map(p => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{p.name}</p>
                  <p className="text-xs text-gray-500">${p.price} · {p.category} · {p.stock} in stock</p>
                </div>
                <button onClick={() => handleDelete(p.id)} className="text-xs text-red-400 hover:text-red-600">Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}