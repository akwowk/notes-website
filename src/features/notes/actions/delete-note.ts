"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

export async function deleteNote(
  id: string
) {
  await prisma.note.delete({
    where: { id }
  })

  revalidatePath("/admin/notes")
  redirect("/admin/notes")
}