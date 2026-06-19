"use client"

import { useState } from "react"
import { createVocabulary } from "@/features/vocabulary/actions/create-vocabulary"

export function AddVocabularyForm() {
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    
    const formData = new FormData(e.currentTarget)
    const res = await createVocabulary(formData)
    
    if (res.error) {
      alert(res.error)
    } else {
      // Reset form
      const form = e.target as HTMLFormElement
      form.reset()
    }
    
    setIsPending(false)
  }

  return (
    <div className="bg-white p-6 border border-slate-200 rounded-xl mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Tambah Kosakata</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="word" className="block text-sm font-bold text-slate-700 mb-1">Kata Asing</label>
            <input 
              type="text" 
              id="word" 
              name="word" 
              required 
              className="w-full h-10 px-3 border border-slate-200 rounded focus:border-slate-900 focus:outline-none text-sm bg-slate-50 focus:bg-white transition-colors"
              placeholder="Contoh: Retrieve"
            />
          </div>
          <div>
            <label htmlFor="translation" className="block text-sm font-bold text-slate-700 mb-1">Terjemahan</label>
            <input 
              type="text" 
              id="translation" 
              name="translation" 
              required 
              className="w-full h-10 px-3 border border-slate-200 rounded focus:border-slate-900 focus:outline-none text-sm bg-slate-50 focus:bg-white transition-colors"
              placeholder="Contoh: Mengambil kembali"
            />
          </div>
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-bold text-slate-700 mb-1">Catatan / Contoh Kalimat (Opsional)</label>
          <textarea 
            id="notes" 
            name="notes" 
            rows={2}
            className="w-full px-3 py-2 border border-slate-200 rounded focus:border-slate-900 focus:outline-none text-sm bg-slate-50 focus:bg-white transition-colors"
            placeholder="Contoh: The dog retrieved the ball."
          />
        </div>
        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={isPending}
            className="bg-slate-900 text-white px-4 py-2 text-sm font-bold rounded hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            {isPending ? "Menyimpan..." : "Simpan Kosakata"}
          </button>
        </div>
      </form>
    </div>
  )
}
