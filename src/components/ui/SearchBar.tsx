"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        document.getElementById("search-input")?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-slate-400 font-bold text-xs">/</span>
      </div>
      <input
        id="search-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari catatan..."
        className="w-full h-10 pl-8 pr-16 border border-slate-200 rounded-lg focus:border-slate-900 focus:outline-none text-sm bg-slate-50 focus:bg-white transition-colors"
      />
      <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-slate-500 bg-white border border-slate-200 rounded">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
    </form>
  )
}
