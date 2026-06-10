"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

export async function deleteTag(id: string) {
  await prisma.tag.delete({
    where: { id }
  })

  revalidatePath("/admin/tags")
}
