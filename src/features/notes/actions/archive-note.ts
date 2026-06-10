"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

export async function archiveNote(id: string) {
  await prisma.note.update({
    where: { id },
    data: { isArchived: true }
  })

  revalidatePath("/admin/notes")
  revalidatePath("/notes")
}
