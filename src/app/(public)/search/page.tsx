import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { EmptyState } from "@/components/ui/EmptyState"
import { Badge } from "@/components/ui/badge"
import { Highlight } from "@/components/ui/Highlight"

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = q?.trim() || ""

  // Format query for PostgreSQL Full Text Search
  // Sanitasi: hapus karakter non-alfanumerik (mencegah SQL/Database error) dan batasi panjang
  const safeQuery = query.replace(/[^\w\s]/g, '').slice(0, 100)
  const words = safeQuery.split(/\s+/).filter(Boolean)
  const formattedQuery = words.length > 0 
    ? words.map(w => `${w}:*`).join(' | ') 
    : ""

  const notes = formattedQuery ? await prisma.note.findMany({
    where: {
      published: true,
      isArchived: false,
      OR: [
        { title: { search: formattedQuery } },
        { content: { search: formattedQuery } },
        {
          tags: {
            some: {
              tag: {
                name: { search: formattedQuery }
              }
            }
          }
        }
      ]
    },
    orderBy: { createdAt: "desc" },
    include: {
      tags: {
        include: { tag: true }
      }
    }
  }) : []

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Hasil Pencarian</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          {query ? (
            <>Menampilkan hasil untuk: <strong className="text-slate-900">&quot;{query}&quot;</strong></>
          ) : (
            "Silakan ketik sesuatu di kotak pencarian."
          )}
        </p>
      </header>

      {!query ? (
        <EmptyState 
          title="Mulai Mencari"
          description="Ketikkan kata kunci (contoh: React, TypeScript) di kotak pencarian di atas atau tekan Ctrl+K."
        />
      ) : notes.length === 0 ? (
        <EmptyState 
          title="Tidak ada hasil"
          description={`Kami tidak dapat menemukan catatan yang cocok dengan "${query}". Coba gunakan kata kunci yang berbeda.`}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note) => (
            <Link
              key={note.id}
              href={`/notes/${note.slug}`}
              className="group bg-white p-6 border border-slate-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:border-slate-900 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all flex flex-col"
            >
              <div className="flex flex-wrap gap-1.5 mb-3">
                {note.tags.map(nt => (
                  <Badge key={nt.tag.id} variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                    <Highlight text={nt.tag.name} query={query} />
                  </Badge>
                ))}
              </div>
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-slate-900 mb-2 line-clamp-2">
                <Highlight text={note.title} query={query} />
              </h2>
              {note.excerpt && (
                <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-1">
                  <Highlight text={note.excerpt} query={query} />
                </p>
              )}
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>{note.createdAt.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span className="text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">Baca &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
