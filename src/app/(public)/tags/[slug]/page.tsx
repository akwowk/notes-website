import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"
import { EmptyState } from "@/components/ui/EmptyState"
import { Badge } from "@/components/ui/badge"

export default async function TagPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const tag = await prisma.tag.findUnique({
    where: { slug }
  })

  if (!tag) {
    notFound()
  }

  const notes = await prisma.note.findMany({
    where: {
      published: true,
      isArchived: false,
      tags: {
        some: {
          tagId: tag.id
        }
      }
    },
    orderBy: { createdAt: "desc" },
    include: {
      tags: {
        include: {
          tag: true
        }
      }
    }
  })

  const allTags = await prisma.tag.findMany({
    where: {
      notes: {
        some: {
          note: {
            published: true,
            isArchived: false
          }
        }
      }
    },
    orderBy: { name: "asc" }
  })

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Tag: {tag.name}
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Catatan yang dikelompokkan dalam label "{tag.name}".
        </p>
      </header>

      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <Link href="/notes">
            <Badge variant="secondary" className="hover:bg-slate-200 cursor-pointer">
              Semua
            </Badge>
          </Link>
          {allTags.map(t => (
            <Link key={t.id} href={`/tags/${t.slug}`}>
              <Badge 
                variant={t.id === tag.id ? "default" : "secondary"} 
                className={t.id === tag.id ? "" : "hover:bg-slate-200 cursor-pointer"}
              >
                {t.name}
              </Badge>
            </Link>
          ))}
        </div>
      )}

      {notes.length === 0 ? (
        <EmptyState 
          title={`Tidak ada catatan untuk tag "${tag.name}"`}
          description="Belum ada catatan yang diterbitkan menggunakan tag ini."
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
                    {nt.tag.name}
                  </Badge>
                ))}
              </div>
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-slate-900 mb-2 line-clamp-2">
                {note.title}
              </h2>
              {note.excerpt && (
                <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-1">
                  {note.excerpt}
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
