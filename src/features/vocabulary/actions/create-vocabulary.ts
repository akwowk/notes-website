"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function createVocabulary(formData: FormData) {
  const session = await auth()
  if (!session) {
    return { error: "Unauthorized" }
  }

  const word = formData.get("word")?.toString().trim()
  const translation = formData.get("translation")?.toString().trim()
  const notes = formData.get("notes")?.toString().trim()

  if (!word || !translation) {
    return { error: "Kata dan terjemahan wajib diisi" }
  }

  try {
    await prisma.vocabulary.create({
      data: {
        word,
        translation,
        notes: notes || null,
      }
    })

    revalidatePath("/admin/vocabulary")
    return { success: true }
  } catch (error) {
    console.error("Failed to create vocabulary:", error)
    return { error: "Gagal menyimpan kosakata" }
  }
}
