import React, { useState } from 'react'

export default function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState('')

  function submit(e) {
    e && e.preventDefault()
    onSearch(input)
  }

  return (
    <form onSubmit={submit} className="flex gap-3 animate-fade-in">
      <div className="flex-1 relative">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="e.g. chicken, garlic, tomato"
          className="w-full p-4 pl-12 rounded-xl border-2 border-warm-gray focus:border-light-teal focus:outline-none transition-all bg-white/70 backdrop-blur-sm text-deep-teal placeholder-teal/50"
        />
        <svg className="w-5 h-5 text-teal absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <button
        type="submit"
        className="px-8 py-4 bg-gradient-to-r from-teal to-light-teal text-white rounded-xl font-semibold disabled:opacity-60 hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:transform-none flex items-center gap-2"
        disabled={loading}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Searching...
          </>
        ) : 'Search Recipes'}
      </button>
    </form>
  )
}
