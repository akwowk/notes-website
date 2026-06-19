"use client"

import { useState } from "react"
import { deleteVocabulary } from "@/features/vocabulary/actions/delete-vocabulary"

export function DeleteVocabularyButton({ id }: { id: string }) {
  const [isPending, setIsPending] = useState(false)

  async function handleDelete() {
    if (!confirm("Hapus kosakata ini?")) return
    
    setIsPending(true)
    const res = await deleteVocabulary(id)
    if (res.error) {
      alert(res.error)
      setIsPending(false)
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="text-xs font-bold text-red-600 hover:text-red-800 disabled:opacity-50"
    >
      Hapus
    </button>
  )
}
