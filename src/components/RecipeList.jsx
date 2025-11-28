import React from 'react'
import RecipeCard from './RecipeCard'

export default function RecipeList({ recipes, loading, onViewed }) {
  if (loading) {
    return (
      <div className="mt-8 text-center py-12">
        <div className="inline-flex items-center gap-3 px-6 py-4 bg-white/70 backdrop-blur-sm rounded-2xl card-shadow">
          <svg className="animate-spin h-8 w-8 text-teal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-deep-teal font-medium">Searching for recipes...</span>
        </div>
      </div>
    )
  }
  
  if (!recipes || recipes.length === 0) {
    return (
      <div className="mt-8 text-center py-12">
        <div className="max-w-md mx-auto">
          <svg className="w-24 h-24 text-warm-gray mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-teal text-lg">No recipes found. Try different ingredients!</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-deep-teal font-medium">
          Found <span className="text-xl font-bold text-teal">{recipes.length}</span> delicious {recipes.length === 1 ? 'recipe' : 'recipes'}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map(r => (
          <RecipeCard key={r.idMeal} meal={r} onViewed={onViewed} />
        ))}
      </div>
    </div>
  )
}
