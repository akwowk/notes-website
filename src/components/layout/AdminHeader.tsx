import * as React from "react"
import Link from "next/link"

export function AdminHeader({ 
  userEmail, 
  userName, 
  userImage 
}: { 
  userEmail?: string | null
  userName?: string | null
  userImage?: string | null
}) {
  const displayName = userName || userEmail || "Admin User"
  const initial = displayName[0].toUpperCase()

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex justify-end items-center px-6 z-40 sticky top-0">
      <div className="flex items-center gap-6">
        <Link href="/" target="_blank" className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors">
          Lihat Web
        </Link>
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          <span className="text-xs text-slate-600 font-medium">{displayName}</span>
          <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-xs font-bold text-white overflow-hidden">
            {userImage ? (
              <img src={userImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              initial
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
