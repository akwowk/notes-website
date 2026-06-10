import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function AdminPage() {
  const [totalNotes, totalTags, totalPublished, totalArchived] = await Promise.all([
    prisma.note.count({ where: { isArchived: false } }),
    prisma.tag.count(),
    prisma.note.count({ where: { published: true, isArchived: false } }),
    prisma.note.count({ where: { isArchived: true } })
  ])

  const recentNotes = await prisma.note.findMany({
    where: { isArchived: false },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, title: true, createdAt: true, published: true }
  })

  const recentlyUpdated = await prisma.note.findMany({
    where: { isArchived: false },
    orderBy: { updatedAt: "desc" },
    take: 5,
    select: { id: true, title: true, updatedAt: true, published: true }
  })

  return (
    <div>
      <section className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Selamat Datang di Dashboard Admin</h2>
        <p className="text-xs text-slate-500 mt-1">Ringkasan sistem knowledge base Anda.</p>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
          <div className="text-3xl font-bold text-slate-900">{totalNotes}</div>
          <div className="text-xs text-slate-500 uppercase font-medium mt-2">Total Catatan</div>
        </div>
        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
          <div className="text-3xl font-bold text-slate-900">{totalTags}</div>
          <div className="text-xs text-slate-500 uppercase font-medium mt-2">Total Tag</div>
        </div>
        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
          <div className="text-3xl font-bold text-slate-900">{totalPublished}</div>
          <div className="text-xs text-slate-500 uppercase font-medium mt-2">Published</div>
        </div>
        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
          <div className="text-3xl font-bold text-slate-900">{totalArchived}</div>
          <div className="text-xs text-slate-500 uppercase font-medium mt-2">Diarsipkan</div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-slate-900">Catatan Baru Dibuat</h3>
          </div>
          <ul className="divide-y divide-slate-100 text-sm flex-1">
            {recentNotes.length === 0 ? (
              <li className="px-6 py-4 text-slate-500 italic">Belum ada catatan.</li>
            ) : (
              recentNotes.map(note => (
                <li key={note.id} className="px-6 py-4 hover:bg-slate-50 flex justify-between items-center group">
                  <div className="truncate pr-4">
                    <span className="font-medium text-slate-900 mr-2">{note.title}</span>
                    {!note.published && <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Draft</span>}
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-xs text-slate-400 group-hover:hidden block">{note.createdAt.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}</span>
                    <Link href={`/admin/notes/${note.id}/edit`} className="text-xs bg-slate-900 hover:bg-slate-800 text-white px-3 py-1 rounded transition-colors hidden group-hover:block">Edit</Link>
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-slate-900">Terakhir Diperbarui</h3>
          </div>
          <ul className="divide-y divide-slate-100 text-sm flex-1">
            {recentlyUpdated.length === 0 ? (
              <li className="px-6 py-4 text-slate-500 italic">Belum ada aktivitas.</li>
            ) : (
              recentlyUpdated.map(note => (
                <li key={note.id} className="px-6 py-4 hover:bg-slate-50 flex justify-between items-center group">
                  <div className="truncate pr-4">
                    <span className="font-medium text-slate-900 mr-2">{note.title}</span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-xs text-slate-400 group-hover:hidden block">{note.updatedAt.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}</span>
                    <Link href={`/admin/notes/${note.id}/edit`} className="text-xs bg-slate-900 hover:bg-slate-800 text-white px-3 py-1 rounded transition-colors hidden group-hover:block">Edit</Link>
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  )
}