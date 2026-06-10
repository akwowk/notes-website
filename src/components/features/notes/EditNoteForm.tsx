"use client"

import { useState, useEffect, useRef } from "react"
import { autosaveNote } from "@/features/notes/actions/autosave-note"
import { MarkdownToolbar } from "./MarkdownToolbar"

interface EditNoteFormProps {
  note: {
    id: string
    title: string
    slug: string
    content: string
    published: boolean
  }
  tags: { id: string, name: string }[]
  noteTagIds: string[]
  updateAction: (formData: FormData) => Promise<void>
}

export function EditNoteForm({ note, tags, noteTagIds, updateAction }: EditNoteFormProps) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  
  // Ref untuk mendeteksi kapan input terakhir diubah
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    setSaveStatus("saving")

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(async () => {
      if (title.length >= 3 && content) {
        const result = await autosaveNote(note.id, { title, content })
        if (result.success) {
          setSaveStatus("saved")
          setTimeout(() => setSaveStatus("idle"), 2000)
        } else {
          setSaveStatus("error")
        }
      }
    }, 2000) // Autosave delay

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [title, content, note.id])

  return (
    <form action={updateAction} className="space-y-6 relative">
      <div className="absolute top-0 right-0">
        {saveStatus === "saving" && <span className="text-xs font-medium text-slate-500 animate-pulse">Menyimpan otomatis...</span>}
        {saveStatus === "saved" && <span className="text-xs font-medium text-green-600">Tersimpan</span>}
        {saveStatus === "error" && <span className="text-xs font-medium text-red-600">Gagal menyimpan</span>}
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-900 mb-2" htmlFor="title">
          Judul Catatan
        </label>
        <input
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-12 px-4 border border-slate-200 rounded-xl focus:border-slate-900 focus:outline-none text-sm transition-colors"
          placeholder="Masukkan judul..."
          required
          minLength={3}
          maxLength={200}
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-900 mb-2" htmlFor="slug">
          Slug / URL
        </label>
        <input
          id="slug"
          name="slug"
          defaultValue={note.slug}
          className="w-full h-12 px-4 border border-slate-200 rounded-xl bg-slate-50 text-slate-500 focus:outline-none text-sm"
          placeholder="url-catatan"
          readOnly
        />
        <p className="text-[10px] text-slate-400 mt-1">Slug akan otomatis diperbarui setelah Anda menekan tombol Simpan Perubahan secara manual.</p>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-900 mb-2" htmlFor="content">
          Konten (Markdown)
        </label>
        <div>
          <MarkdownToolbar textareaId="content" />
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[300px] p-4 border border-slate-200 rounded-b-xl focus:border-slate-900 focus:outline-none text-sm font-mono transition-colors"
            placeholder="Mulai menulis dengan markdown..."
            required
          />
        </div>
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
                  defaultChecked={noteTagIds.includes(tag.id)}
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

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="published"
          name="published"
          defaultChecked={note.published}
          className="w-4 h-4 border-slate-300 rounded text-slate-900 focus:ring-slate-900"
        />
        <label htmlFor="published" className="text-sm font-medium text-slate-900">
          Diterbitkan (Published)
        </label>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
        <button 
          type="submit"
          className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 text-sm font-medium rounded-xl transition-colors"
        >
          Simpan Perubahan
        </button>
      </div>
    </form>
  )
}
