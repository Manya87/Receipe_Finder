import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { hashPassword } from '../utils/auth'

export default function Signup({ onSignup }) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  async function submit(e) {
    e && e.preventDefault()
    setError(null)
    setSuccess(null)
    const username = name.trim()
    if (!username || !password) {
      setError('Username and password required')
      return
    }
    if (password !== password2) {
      setError('Passwords do not match')
      return
    }
    const users = JSON.parse(localStorage.getItem('recipe_finder_users') || '{}')
    if (users[username]) {
      setError('Username already exists')
      return
    }
    const hashed = await hashPassword(password)
    users[username] = hashed
    localStorage.setItem('recipe_finder_users', JSON.stringify(users))
    setSuccess('Account created — you are now signed in')
    onSignup(username)
  }

  return (
    <div className="max-w-md mx-auto mt-20 animate-scale-in">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl card-shadow border border-warm-gray">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-coral to-peach rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-deep-teal mb-2">Join Recipe Finder</h2>
          <p className="text-sm text-teal">Create your account to start exploring</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Username" 
              className="w-full p-3 border-2 border-warm-gray rounded-lg focus:border-coral focus:outline-none transition-colors bg-white/50" 
            />
          </div>
          <div>
            <input 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              type="password" 
              placeholder="Password" 
              className="w-full p-3 border-2 border-warm-gray rounded-lg focus:border-coral focus:outline-none transition-colors bg-white/50" 
            />
          </div>
          <div>
            <input 
              value={password2} 
              onChange={e => setPassword2(e.target.value)} 
              type="password" 
              placeholder="Confirm password" 
              className="w-full p-3 border-2 border-warm-gray rounded-lg focus:border-coral focus:outline-none transition-colors bg-white/50" 
            />
          </div>
          {error && <div className="text-sm text-coral bg-coral/10 p-3 rounded-lg">{error}</div>}
          {success && <div className="text-sm text-teal bg-teal/10 p-3 rounded-lg">{success}</div>}
          <button className="w-full py-3 bg-gradient-to-r from-coral to-peach text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5" type="submit">
            Create Account
          </button>
          <div className="text-center">
            <span className="text-sm text-teal">Already have an account? </span>
            <Link to="/login" className="text-sm font-semibold text-coral hover:text-peach transition-colors">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
