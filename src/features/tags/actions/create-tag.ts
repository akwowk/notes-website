"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { tagSchema } from "../schema"
import { generateSlug } from "@/features/notes/utils/generate-slug"

export async function createTag(formData: FormData) {
  const parsed = tagSchema.parse({
    name: formData.get("name"),
  })

  const slug = generateSlug(parsed.name)

  await prisma.tag.create({
    data: {
      name: parsed.name,
      slug
    }
  })

  revalidatePath("/admin/tags")
}
