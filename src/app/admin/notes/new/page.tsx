import { createNote } from "@/features/notes/actions/create-note"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { MarkdownTextarea } from "@/components/features/notes/MarkdownTextarea"

export default async function CreateNotePage() {
  const tags = await prisma.tag.findMany({
    orderBy: { name: "asc" }
  })

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Buat Catatan Baru</h2>
          <p className="text-xs text-slate-500 mt-1">Tulis dan simpan ide baru Anda ke knowledge base.</p>
        </div>
        <Link 
          href="/admin/notes"
          className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          &larr; Kembali
        </Link>
      </div>

      <form action={createNote} className="bg-white p-6 border border-slate-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-2" htmlFor="title">
            Judul Catatan
          </label>
          <input
            id="title"
            name="title"
            className="w-full h-12 px-4 border border-slate-200 rounded-xl focus:border-slate-900 focus:outline-none text-sm transition-colors"
            placeholder="Masukkan judul..."
            required
            minLength={3}
            maxLength={200}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-900 mb-2" htmlFor="slug">
            Slug / URL (Otomatis)
          </label>
          <input
            id="slug"
            name="slug"
            className="w-full h-12 px-4 border border-slate-200 rounded-xl bg-slate-50 text-slate-500 focus:outline-none text-sm"
            placeholder="Akan digenerate otomatis dari judul..."
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-900 mb-2" htmlFor="content">
            Konten (Markdown)
          </label>
          <MarkdownTextarea
            id="content"
            name="content"
            className="w-full min-h-[300px] p-4 border border-slate-200 rounded-b-xl focus:border-slate-900 focus:outline-none text-sm font-mono transition-colors"
            placeholder="Mulai menulis dengan markdown..."
            required
            rows={20}
          />
        </div>

        {tags.length > 0 && (
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-3">
              {tags.map(tag => (
                <label key={tag.id} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="tags"
                    value={tag.id}
                    className="w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-900 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                    {tag.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 pt-4">
          <input
            type="checkbox"
            id="published"
            name="published"
            defaultChecked={true}
            className="w-4 h-4 border-slate-300 rounded text-slate-900 focus:ring-slate-900"
          />
          <label htmlFor="published" className="text-sm font-medium text-slate-900">
            Langsung terbitkan (Published)
          </label>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
          <button 
            type="submit"
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 text-sm font-medium rounded-xl transition-colors"
          >
            Simpan Catatan
          </button>
        </div>
      </form>
    </div>
  )
}