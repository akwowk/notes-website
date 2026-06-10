"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()

  const links = [
    { name: "Dashboard", href: "/admin" },
    { name: "Semua Catatan", href: "/admin/notes" },
    { name: "Tag / Label", href: "/admin/tags" },
    { name: "Arsip", href: "/admin/archive" },
    { name: "Pengaturan", href: "/admin/settings" },
  ]

  return (
    <aside className="w-full md:w-[280px] static md:fixed left-0 top-0 h-auto md:h-full bg-slate-200 border-b md:border-r md:border-b-0 border-slate-300 p-4 flex flex-col z-50">
      <div className="mb-4 md:mb-6 flex justify-between items-center md:block">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Notes App Admin</h1>
          <p className="text-xs text-slate-500">Knowledge Base Management</p>
        </div>
        <div className="md:hidden">
          <Link 
            href="/admin/notes/new"
            className="bg-slate-900 text-white px-3 py-1.5 font-medium rounded text-xs"
          >
            + Baru
          </Link>
        </div>
      </div>

      <nav className="flex md:flex-col overflow-x-auto md:overflow-visible space-x-2 md:space-x-0 md:space-y-1 pb-2 md:pb-0 scrollbar-hide">
        {links.map((link) => {
          const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/admin")
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 font-medium rounded-sm transition-colors whitespace-nowrap ${
                isActive 
                  ? "bg-slate-900 text-white" 
                  : "text-slate-700 hover:bg-slate-300"
              }`}
            >
              {link.name}
            </Link>
          )
        })}
      </nav>

      <div className="hidden md:block mt-auto pt-4 border-t border-slate-300">
        <Link 
          href="/admin/notes/new"
          className="w-full block text-center bg-slate-900 hover:bg-slate-800 text-white py-2 font-medium rounded-xl transition-colors"
        >
          + Catatan Baru
        </Link>
      </div>
    </aside>
  )
}
