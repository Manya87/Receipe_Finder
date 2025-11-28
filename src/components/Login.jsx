import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { verifyPassword } from '../utils/auth'

export default function Login({ onLogin }) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  async function submit(e) {
    e && e.preventDefault()
    setError(null)
    const username = name.trim()
    if (!username || !password) {
      setError('Enter username and password')
      return
    }
    const users = JSON.parse(localStorage.getItem('recipe_finder_users') || '{}')
    const stored = users[username]
    if (!stored) {
      setError('No account found. Sign up first.')
      return
    }
    const ok = await verifyPassword(password, stored)
    if (!ok) {
      setError('Invalid username or password')
      return
    }
    onLogin(username)
  }

  return (
    <div className="max-w-md mx-auto mt-20 animate-scale-in">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl card-shadow border border-warm-gray">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-teal to-light-teal rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-deep-teal mb-2">Welcome Back</h2>
          <p className="text-sm text-teal">Sign in to discover amazing recipes</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Username" 
              className="w-full p-3 border-2 border-warm-gray rounded-lg focus:border-teal focus:outline-none transition-colors bg-white/50" 
            />
          </div>
          <div>
            <input 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              type="password" 
              placeholder="Password" 
              className="w-full p-3 border-2 border-warm-gray rounded-lg focus:border-teal focus:outline-none transition-colors bg-white/50" 
            />
          </div>
          {error && <div className="text-sm text-coral bg-coral/10 p-3 rounded-lg">{error}</div>}
          <button className="w-full py-3 bg-gradient-to-r from-teal to-light-teal text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5" type="submit">
            Sign In
          </button>
          <div className="text-center">
            <span className="text-sm text-teal">Don't have an account? </span>
            <Link to="/signup" className="text-sm font-semibold text-coral hover:text-peach transition-colors">
              Create one
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
