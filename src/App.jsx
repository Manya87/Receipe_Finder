import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import SearchBar from './components/SearchBar'
import RecipeList from './components/RecipeList'
import Login from './components/Login'
import Signup from './components/Signup'
import History from './components/History'

function App() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem('recipe_finder_user')
    if (stored) setUsername(stored)
  }, [])

  function handleLogin(name) {
    setUsername(name)
    localStorage.setItem('recipe_finder_user', name)
    navigate('/')
  }

  function handleLogout() {
    setUsername(null)
    localStorage.removeItem('recipe_finder_user')
    navigate('/')
  }

  function addSearchHistory(query, resultsCount) {
    if (!username) return
    try {
      const key = `recipe_finder_search_${username}`
      const arr = JSON.parse(localStorage.getItem(key) || '[]')
      arr.unshift({ query, resultsCount, at: Date.now() })
      localStorage.setItem(key, JSON.stringify(arr.slice(0, 50)))
    } catch (e) {
      console.warn('Could not save search history', e)
    }
  }

  function addViewedRecipe(meal) {
    if (!username) return
    try {
      const key = `recipe_finder_viewed_${username}`
      const arr = JSON.parse(localStorage.getItem(key) || '[]')
      arr.unshift({ meal, at: Date.now() })
      // keep latest 100
      localStorage.setItem(key, JSON.stringify(arr.slice(0, 100)))
    } catch (e) {
      console.warn('Could not save viewed recipe', e)
    }
  }

  async function searchByIngredients(input) {
    const raw = input.split(',').map(s => s.trim()).filter(Boolean)
    if (raw.length === 0) {
      setRecipes([])
      return
    }
    setLoading(true)
    setError(null)
    try {
      const lists = await Promise.all(raw.map(async (ing) => {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ing)}`)
        const json = await res.json()
        return json.meals || []
      }))

      let intersectIds = null
      for (const arr of lists) {
        const ids = new Set(arr.map(m => m.idMeal))
        if (intersectIds === null) intersectIds = ids
        else intersectIds = new Set([...intersectIds].filter(id => ids.has(id)))
      }

      const idsArray = Array.from(intersectIds || [])

      const details = await Promise.all(idsArray.slice(0, 30).map(async id => {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        const j = await res.json()
        return j.meals ? j.meals[0] : null
      }))

      const filtered = details.filter(Boolean)
      setRecipes(filtered)
      addSearchHistory(input, filtered.length)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch recipes. Try again later.')
    } finally {
      setLoading(false)
    }
  }

  // If not logged in, show Login/Signup routes
  if (!username) {
    return (
      <div className="min-h-screen p-6 max-w-4xl mx-auto">
        <Routes>
          <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 max-w-6xl mx-auto">
      <header className="mb-8 bg-white/70 backdrop-blur-lg rounded-2xl p-6 card-shadow border border-warm-gray animate-fade-in">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-deep-teal to-light-teal bg-clip-text text-transparent mb-1">Recipe Finder</h1>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <div className="w-2 h-2 bg-coral rounded-full animate-pulse"></div>
              <p className="text-sm text-teal">Signed in as <strong className="text-deep-teal">{username}</strong></p>
            </div>
          </div>
          <nav className="flex gap-2 items-center">
            <Link to="/" className="px-4 py-2 text-sm font-medium text-teal hover:bg-teal/10 rounded-lg transition-colors">
              Home
            </Link>
            <Link to="/history" className="px-4 py-2 text-sm font-medium text-teal hover:bg-teal/10 rounded-lg transition-colors">
              History
            </Link>
            <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-coral to-peach rounded-lg hover:shadow-md transition-all">
              Logout
            </button>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={(
          <>
            <div className="mb-6">
              <p className="text-teal text-center mb-4">Search recipes by ingredients (comma-separated)</p>
              <SearchBar onSearch={searchByIngredients} loading={loading} />
            </div>
            {error && <div className="mt-4 p-4 bg-coral/10 border-l-4 border-coral text-coral rounded-lg animate-fade-in">{error}</div>}
            <RecipeList recipes={recipes} loading={loading} onViewed={addViewedRecipe} />
          </>
        )} />
        <Route path="/history" element={<History username={username} />} />
      </Routes>

      <footer className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 backdrop-blur-sm rounded-full border border-warm-gray">
          <span className="text-sm text-teal font-medium">Powered by</span>
          <span className="text-sm font-bold text-deep-teal">TheMealDB</span>
        </div>
      </footer>
    </div>
  )
}

export default App
