export function Footer() {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 mt-auto py-8">
      <div className="max-w-5xl mx-auto px-6 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Notes App Knowledge Base. All rights reserved.</p>
        <p className="mt-1">Built for structured learning and reading.</p>
      </div>
    </footer>
  )
}
