import Link from "next/link"
import { SearchBar } from "@/components/ui/SearchBar"

export function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Row 1: Logo and Links */}
        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-start">
          <Link href="/" className="flex items-center gap-2 text-slate-900 font-bold text-lg shrink-0">
            <span className="bg-slate-900 text-white px-2 rounded font-mono text-sm">N</span>
            <span>Notes App</span>
          </Link>
          
          <div className="flex items-center gap-4 shrink-0 sm:ml-4">
            <Link href="/notes" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
              Jelajahi
            </Link>
            <Link 
              href="/login" 
              className="text-sm font-bold bg-slate-100 text-slate-900 px-3 py-1 rounded hover:bg-slate-200 border border-slate-200 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
        
        {/* Row 2 on Mobile, Row 1 on Desktop: Search Bar */}
        <div className="w-full sm:flex-1 sm:max-w-xs ml-auto">
          <SearchBar />
        </div>
      </div>
    </nav>
  )
}
