import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { updateNote } from "@/features/notes/actions/update-note"
import { deleteNote } from "@/features/notes/actions/delete-note"
import { EditNoteForm } from "@/components/features/notes/EditNoteForm"

export default async function EditPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const note = await prisma.note.findUniqueOrThrow({
    where: { id },
    include: {
      tags: true
    }
  })

  const tags = await prisma.tag.findMany({
    orderBy: { name: "asc" }
  })

  const noteTagIds = note.tags.map(nt => nt.tagId)

  const updateAction = updateNote.bind(null, note.id)
  const deleteAction = deleteNote.bind(null, note.id)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Edit Catatan</h2>
          <p className="text-xs text-slate-500 mt-1">Perbarui konten dan pengaturan catatan Anda.</p>
        </div>
        <Link 
          href="/admin/notes"
          className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          &larr; Kembali
        </Link>
      </div>

      <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] space-y-6">
        <EditNoteForm 
          note={note} 
          tags={tags} 
          noteTagIds={noteTagIds} 
          updateAction={updateAction} 
        />

        <div className="pt-6 mt-6 border-t border-red-100">
          <h3 className="text-sm font-bold text-red-600 mb-2">Hapus Catatan</h3>
          <p className="text-xs text-slate-500 mb-4">Tindakan ini tidak dapat dibatalkan. Catatan akan dihapus secara permanen dari database.</p>
          <form action={deleteAction}>
            <button 
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 text-sm font-medium rounded-xl transition-colors"
            >
              Hapus Permanen
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}