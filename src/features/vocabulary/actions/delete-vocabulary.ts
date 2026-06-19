"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function deleteVocabulary(id: string) {
  const session = await auth()
  if (!session) {
    return { error: "Unauthorized" }
  }

  try {
    await prisma.vocabulary.delete({
      where: { id }
    })

    revalidatePath("/admin/vocabulary")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete vocabulary:", error)
    return { error: "Gagal menghapus kosakata" }
  }
}
