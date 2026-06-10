"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

export async function restoreNote(id: string) {
  await prisma.note.update({
    where: { id },
    data: { isArchived: false }
  })

  revalidatePath("/admin/notes")
  revalidatePath("/notes")
}
