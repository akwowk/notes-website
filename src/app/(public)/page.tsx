import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default async function Home() {
  const [totalNotes, totalTags, recentNotes, recentlyUpdated] = await Promise.all([
    prisma.note.count({ where: { published: true, isArchived: false } }),
    prisma.tag.count(),
    prisma.note.findMany({
      where: { published: true, isArchived: false },
      orderBy: { createdAt: "desc" },
      take: 4,
      include: { tags: { include: { tag: true } } }
    }),
    prisma.note.findMany({
      where: { published: true, isArchived: false },
      orderBy: { updatedAt: "desc" },
      take: 5
    })
  ])

  const currentDate = new Date().toLocaleDateString('id-ID', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  })

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 md:py-16">
      <section className="mb-10 md:mb-16 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          Selamat Datang di Knowledge Base
        </h1>
        <p className="text-slate-500 text-lg md:text-xl max-w-2xl">
          Eksplorasi kumpulan artikel, catatan teknis, dan dokumentasi.
        </p>
        <p className="text-sm text-slate-400 mt-4 font-medium uppercase tracking-widest">
          Hari ini: {currentDate}
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0 font-bold text-xl text-slate-700">
            C
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">{totalNotes}</div>
            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Total Catatan</div>
          </div>
        </div>
        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0 font-bold text-xl text-slate-700">
            T
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">{totalTags}</div>
            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Total Tag Tersedia</div>
          </div>
        </div>
      </section>

      {/* Tambahan Seksi Konten (AdSense Thin Content Fix) */}
      <section className="bg-slate-900 text-white rounded-xl p-8 md:p-12 mb-16 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Tentang Knowledge Base Ini</h2>
        <p className="text-slate-300 leading-relaxed mb-6">
          Situs ini adalah repositori pribadi yang memuat berbagai macam artikel, panduan teknis, eksperimen kode, dan opini mengenai teknologi modern. Kami berfokus pada pengembangan perangkat lunak, sistem keamanan, arsitektur *web*, hingga produktivitas digital. Semua tulisan dikurasi agar mudah dipahami, minimalis, dan langsung pada intinya.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-700 pt-8">
          <div>
            <h3 className="font-bold text-lg mb-2">Bebas Distraksi</h3>
            <p className="text-sm text-slate-400">Tampilan *read-first* tanpa elemen yang tidak perlu. Fokus penuh pada literatur.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Pembaruan Rutin</h3>
            <p className="text-sm text-slate-400">Dapatkan wawasan segar dari catatan yang secara berkala diperbarui oleh penulis.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Penelusuran Pintar</h3>
            <p className="text-sm text-slate-400">Cari informasi yang spesifik dalam hitungan detik menggunakan fitur pencarian cepat.</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <div className="flex justify-between items-end mb-6 border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-bold text-slate-900">Catatan Terbaru</h2>
            <Link href="/notes" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Lihat Semua &rarr;
            </Link>
          </div>
          
          {recentNotes.length === 0 ? (
            <div className="text-center py-12 bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <p className="text-slate-500">Belum ada catatan yang diterbitkan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recentNotes.map((note) => (
                <Link
                  key={note.id}
                  href={`/notes/${note.slug}`}
                  className="group bg-white p-6 border border-slate-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:border-slate-900 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all flex flex-col h-full"
                >
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {note.tags.map(nt => (
                      <Badge key={nt.tag.id} variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                        {nt.tag.name}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-slate-900 mb-2 line-clamp-2">
                    {note.title}
                  </h3>
                  {note.excerpt && (
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-1">
                      {note.excerpt}
                    </p>
                  )}
                  <div className="mt-auto pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
                    {note.createdAt.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-4">
          <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">Terakhir Diperbarui</h2>
          
          {recentlyUpdated.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-500 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              Belum ada aktivitas.
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden">
              <ul className="divide-y divide-slate-100 text-sm">
                {recentlyUpdated.map((note) => (
                  <li key={note.id} className="hover:bg-slate-50 transition-colors">
                    <Link href={`/notes/${note.slug}`} className="block p-4">
                      <p className="font-semibold text-slate-900 truncate mb-1">{note.title}</p>
                      <p className="text-[11px] text-slate-500 font-medium tracking-wide uppercase">
                        {note.updatedAt.toLocaleDateString('id-ID', { 
                          month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                        })}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
