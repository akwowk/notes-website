interface HighlightProps {
  text: string
  query: string
}

export function Highlight({ text, query }: HighlightProps) {
  if (!query.trim()) {
    return <span>{text}</span>
  }

  // Create a regex to match the query case-insensitively
  // Escape special regex characters in the query
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escapedQuery})`, 'gi')
  
  const parts = text.split(regex)

  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 text-slate-900 rounded-sm px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  )
}
