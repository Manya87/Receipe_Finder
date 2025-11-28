import React, { useMemo, useState } from 'react'

function prettyDate(ts) {
  return new Date(ts).toLocaleString()
}

export default function History({ username }) {
  const [searches, setSearches] = useState(() => JSON.parse(localStorage.getItem(`recipe_finder_search_${username}`) || '[]'))
  const [viewed, setViewed] = useState(() => JSON.parse(localStorage.getItem(`recipe_finder_viewed_${username}`) || '[]'))

  function clearSearches() {
    localStorage.removeItem(`recipe_finder_search_${username}`)
    setSearches([])
  }

  function clearViewed() {
    localStorage.removeItem(`recipe_finder_viewed_${username}`)
    setViewed([])
  }

  const recentSearches = useMemo(() => searches.slice(0, 50), [searches])
  const recentViewed = useMemo(() => viewed.slice(0, 50), [viewed])

  return (
    <div className="animate-fade-in">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-deep-teal mb-2">Your History</h2>
        <p className="text-teal">View your search and recipe viewing activity</p>
      </div>

      <section className="mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 card-shadow border border-warm-gray">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-deep-teal flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gradient-to-b from-teal to-light-teal rounded-full"></span>
              Recent Searches
            </h3>
            <button className="px-3 py-1.5 text-sm font-medium text-white bg-coral rounded-lg hover:bg-peach transition-colors" onClick={clearSearches}>Clear All</button>
          </div>
          {recentSearches.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-16 h-16 text-warm-gray mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-teal">No searches yet. Start exploring recipes!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentSearches.map((s, idx) => (
                <div key={idx} className="p-3 bg-cream/50 rounded-lg border border-warm-gray hover:border-light-teal transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-teal to-light-teal rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {s.resultsCount}
                      </div>
                      <div>
                        <p className="font-medium text-deep-teal">{s.query}</p>
                        <p className="text-xs text-teal">{prettyDate(s.at)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 card-shadow border border-warm-gray">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-deep-teal flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gradient-to-b from-coral to-peach rounded-full"></span>
              Viewed Recipes
            </h3>
            <button className="px-3 py-1.5 text-sm font-medium text-white bg-coral rounded-lg hover:bg-peach transition-colors" onClick={clearViewed}>Clear All</button>
          </div>
          {recentViewed.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-16 h-16 text-warm-gray mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <p className="text-teal">No viewed recipes yet. Click "View Recipe" to see details!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recentViewed.map((v, idx) => (
                <div key={idx} className="bg-cream/50 rounded-lg border border-warm-gray hover:border-coral transition-colors overflow-hidden group">
                  <div className="flex gap-3 p-3">
                    <img src={v.meal.strMealThumb} alt="thumb" className="w-20 h-20 object-cover rounded-lg group-hover:scale-105 transition-transform" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-deep-teal truncate">{v.meal.strMeal}</p>
                      <p className="text-xs text-teal mt-1">{v.meal.strCategory}</p>
                      <p className="text-xs text-teal/70 mt-1">{prettyDate(v.at)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
