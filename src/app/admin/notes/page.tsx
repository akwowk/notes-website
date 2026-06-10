import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/EmptyState"
import { archiveNote } from "@/features/notes/actions/archive-note"
import { restoreNote } from "@/features/notes/actions/restore-note"

export default async function NotesPage({
  searchParams
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  const { filter } = await searchParams
  const activeFilter = filter || "all"

  const where = activeFilter === "archived" ? { isArchived: true }
    : activeFilter === "published" ? { isArchived: false, published: true }
    : activeFilter === "draft" ? { isArchived: false, published: false }
    : { isArchived: false }

  const notes = await prisma.note.findMany({
    where,
    orderBy: { updatedAt: "desc" }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Manajemen Catatan</h2>
          <p className="text-xs text-slate-500 mt-1">Kelola semua catatan knowledge base Anda.</p>
        </div>
        <Button asChild>
          <Link href="/admin/notes/new">+ Catatan Baru</Link>
        </Button>
      </div>

      <div className="flex gap-2 mb-4">
        <Button variant={activeFilter === "all" ? "default" : "secondary"} size="sm" asChild>
          <Link href="/admin/notes">Semua</Link>
        </Button>
        <Button variant={activeFilter === "published" ? "default" : "secondary"} size="sm" asChild>
          <Link href="/admin/notes?filter=published">Published</Link>
        </Button>
        <Button variant={activeFilter === "draft" ? "default" : "secondary"} size="sm" asChild>
          <Link href="/admin/notes?filter=draft">Draft</Link>
        </Button>
        <Button variant={activeFilter === "archived" ? "default" : "secondary"} size="sm" asChild>
          <Link href="/admin/notes?filter=archived">Archived</Link>
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <div className="col-span-5">Judul</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Terakhir Diperbarui</div>
          <div className="col-span-3 text-right">Aksi</div>
        </div>
        
        {notes.length === 0 ? (
          <EmptyState 
            title="Tidak Ada Catatan"
            description="Tidak ada catatan yang cocok dengan filter yang dipilih."
            action={
              <Button asChild>
                <Link href="/admin/notes/new">Buat Catatan Baru</Link>
              </Button>
            }
          />
        ) : (
          <ul className="divide-y divide-slate-200 text-sm">
            {notes.map((note) => (
              <li key={note.id} className="grid grid-cols-12 px-6 py-4 items-center hover:bg-slate-50 transition-colors">
                <div className="col-span-5 pr-4">
                  <div className="font-medium text-slate-900 truncate">{note.title}</div>
                  <div className="text-xs text-slate-500 truncate mt-0.5">{note.slug}</div>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Badge variant={note.published ? "default" : "secondary"}>
                    {note.published ? 'Published' : 'Draft'}
                  </Badge>
                  {note.isArchived && (
                    <Badge variant="destructive">Archived</Badge>
                  )}
                </div>
                <div className="col-span-2 text-xs text-slate-500">
                  {note.updatedAt.toLocaleDateString('id-ID')}
                </div>
                <div className="col-span-3 flex justify-end gap-2 items-center">
                  {!note.isArchived && (
                    <Button variant="secondary" size="sm" asChild>
                      <Link href={`/notes/${note.slug}`} target="_blank">Lihat</Link>
                    </Button>
                  )}
                  <Button size="sm" asChild>
                    <Link href={`/admin/notes/${note.id}/edit`}>Edit</Link>
                  </Button>
                  {note.isArchived ? (
                    <form action={restoreNote.bind(null, note.id)}>
                      <Button variant="outline" size="sm" type="submit">Restore</Button>
                    </form>
                  ) : (
                    <form action={archiveNote.bind(null, note.id)}>
                      <Button variant="destructive" size="sm" type="submit">Archive</Button>
                    </form>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}