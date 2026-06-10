import * as React from "react"

interface EmptyStateProps {
  title: string
  description: string
  action?: React.ReactNode
}

export function EmptyState({ 
  title, 
  description, 
  action 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-slate-300">
        /
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
      {action}
    </div>
  )
}
