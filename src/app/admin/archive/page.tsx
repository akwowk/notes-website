import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { restoreNote } from "@/features/notes/actions/restore-note"
import { deleteNote } from "@/features/notes/actions/delete-note"

export default async function ArchivePage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = q?.trim() || ""

  const whereCondition: any = {
    isArchived: true
  }

  if (query) {
    whereCondition.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { content: { contains: query, mode: "insensitive" } }
    ]
  }

  const archivedNotes = await prisma.note.findMany({
    where: whereCondition,
    orderBy: { updatedAt: "desc" }
  })

  // To build a search form that updates searchParams
  async function searchAction(formData: FormData) {
    "use server"
    const searchQuery = formData.get("q")?.toString() || ""
    redirect(searchQuery ? `/admin/archive?q=${encodeURIComponent(searchQuery)}` : "/admin/archive")
  }

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Arsip Catatan</h2>
          <p className="text-xs text-slate-500 mt-1">Kelola catatan lama dan sudah tidak aktif.</p>
        </div>
        
        <form action={searchAction} className="relative w-64">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Cari arsip..."
            className="w-full h-10 pl-3 pr-10 border border-slate-200 rounded-xl focus:border-slate-900 focus:outline-none text-sm transition-colors"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900">
            &rarr;
          </button>
        </form>
      </div>

      {archivedNotes.length === 0 ? (
        <div className="bg-white p-12 border border-slate-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] text-center">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Belum Ada Arsip</h3>
          <p className="text-slate-500 mb-6">Catatan yang Anda arsipkan akan muncul di sini sebagai riwayat linimasa.</p>
          {query && (
            <Button variant="outline" asChild>
              <Link href="/admin/archive">Bersihkan Pencarian</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="relative pl-6 md:pl-8 py-4">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[11px] md:left-[15px] top-0 bottom-0 w-0.5 bg-slate-200" />
          
          <div className="space-y-10">
            {archivedNotes.map((note) => (
              <div key={note.id} className="relative">
                {/* Timeline Dot */}
                <div className="absolute -left-[29px] md:-left-[33px] top-1.5 w-4 h-4 bg-white border-2 border-slate-400 rounded-full z-10" />
                
                <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all flex flex-col md:flex-row gap-6 md:items-start justify-between">
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                      {note.updatedAt.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{note.title}</h3>
                    {note.excerpt ? (
                      <p className="text-sm text-slate-600 line-clamp-2">{note.excerpt}</p>
                    ) : (
                      <p className="text-sm text-slate-600 line-clamp-2 italic">Tidak ada pratinjau...</p>
                    )}
                  </div>
                  
                  <div className="flex md:flex-col gap-2 shrink-0">
                    <form action={restoreNote.bind(null, note.id)}>
                      <Button variant="default" size="sm" type="submit" className="w-full">
                        Kembalikan
                      </Button>
                    </form>
                    <form action={deleteNote.bind(null, note.id)}>
                      <Button variant="destructive" size="sm" type="submit" className="w-full">
                        Hapus Permanen
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
