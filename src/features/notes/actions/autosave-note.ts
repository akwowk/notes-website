"use server"

import { prisma } from "@/lib/prisma"
import { generateSlug } from "@/features/notes/utils/generate-slug"
import { generateExcerpt } from "@/features/notes/utils/generate-excerpt"

export async function autosaveNote(id: string, data: { title: string, content: string }) {
  try {
    const slug = generateSlug(data.title)
    const excerpt = generateExcerpt(data.content)

    // Autosave shouldn't throw error if slug exists (it happens when title is the same but another note has same slug).
    // We append random string if it exists.
    let finalSlug = slug
    const existing = await prisma.note.findFirst({
      where: { slug, id: { not: id } }
    })
    
    if (existing) {
      finalSlug = `${slug}-${Math.random().toString(36).substring(2, 6)}`
    }

    await prisma.note.update({
      where: { id },
      data: {
        title: data.title,
        slug: finalSlug,
        content: data.content,
        excerpt
      }
    })

    return { success: true }
  } catch (error) {
    console.error("Autosave failed", error)
    return { success: false }
  }
}
