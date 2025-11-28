import React, { useState } from 'react'

function getIngredients(meal) {
  const list = []
  for (let i = 1; i <= 20; i++) {
    const ing = meal['strIngredient' + i]
    const measure = meal['strMeasure' + i]
    if (ing && ing.trim()) list.push(`${ing}${measure ? ' — ' + measure.trim() : ''}`)
  }
  return list
}

export default function RecipeCard({ meal, onViewed }) {
  const [open, setOpen] = useState(false)
  const ingredients = getIngredients(meal)

  function toggle() {
    setOpen(s => {
      const next = !s
      if (next && typeof onViewed === 'function') onViewed(meal)
      return next
    })
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl card-shadow overflow-hidden flex flex-col border border-warm-gray transition-all hover:scale-105 animate-slide-up">
      <div className="relative overflow-hidden group">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover transition-transform group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-teal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-3 right-3 flex gap-2">
          <span className="px-3 py-1 bg-coral/90 backdrop-blur-sm text-white text-xs rounded-full font-medium">{meal.strCategory}</span>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-deep-teal mb-2">{meal.strMeal}</h3>
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm text-teal font-medium">{meal.strArea}</p>
        </div>
        <p className="text-sm mt-2 line-clamp-3 text-deep-teal/70 flex-1">{meal.strInstructions}</p>
        <div className="mt-4 flex items-center gap-3">
          <button 
            onClick={toggle} 
            className="flex-1 py-2 px-4 bg-gradient-to-r from-teal to-light-teal text-white rounded-lg font-medium hover:shadow-md transition-all text-sm"
          >
            {open ? 'Hide Details' : 'View Recipe'}
          </button>
          {meal.strSource && (
            <a 
              href={meal.strSource} 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 border-2 border-teal rounded-lg hover:bg-teal hover:text-white transition-colors"
              title="View Source"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
      {open && (
        <div className="px-5 pb-5 animate-fade-in">
          <div className="border-t-2 border-warm-gray pt-4 space-y-4">
            <div>
              <h4 className="font-bold text-deep-teal mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-gradient-to-b from-coral to-peach rounded-full"></span>
                Ingredients
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ingredients.map((it, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-deep-teal/80">
                    <span className="w-1.5 h-1.5 bg-light-teal rounded-full"></span>
                    {it}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-deep-teal mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-gradient-to-b from-teal to-light-teal rounded-full"></span>
                Instructions
              </h4>
              <p className="whitespace-pre-line text-sm text-deep-teal/70 leading-relaxed">{meal.strInstructions}</p>
            </div>
            {meal.strYoutube && (
              <a 
                href={meal.strYoutube} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-coral text-white rounded-lg hover:bg-peach transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Watch on YouTube
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
