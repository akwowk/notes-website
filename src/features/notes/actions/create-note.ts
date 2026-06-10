"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { createNoteSchema } from "../schema"
import { generateSlug } from "../utils/generate-slug"
import { generateExcerpt } from "../utils/generate-excerpt"

export async function createNote(
  formData: FormData
) {
  const publishedValue = formData.get("published");
  const isPublished = publishedValue === "on" || publishedValue === "true";

  const parsed = createNoteSchema.parse({
    title: formData.get("title"),
    content: formData.get("content"),
    published: isPublished,
    tagIds: formData.getAll("tags")
  })

  const slug = generateSlug(parsed.title)
  const excerpt = generateExcerpt(parsed.content)

  await prisma.note.create({
    data: {
      title: parsed.title,
      slug,
      content: parsed.content,
      excerpt,
      published: parsed.published,
      ...(parsed.tagIds && parsed.tagIds.length > 0 && {
        tags: {
          create: parsed.tagIds.map(tagId => ({
            tag: { connect: { id: tagId } }
          }))
        }
      })
    }
  })

  revalidatePath("/admin/notes")
  redirect("/admin/notes")
}