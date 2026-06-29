import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer"
import { Badge } from "@/components/ui/badge"
import { getReadingTime } from "@/features/notes/utils/reading-time"

import type { Metadata } from "next"

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const note = await prisma.note.findUnique({
    where: { slug },
    include: { tags: { include: { tag: true } } }
  })

  if (!note || note.isArchived) {
    return { title: "Not Found" }
  }

  const excerptText = note.excerpt || note.content.slice(0, 150).replace(/[#*`_\[\]>]/g, '') + "..."
  const keywords = note.tags.map(nt => nt.tag.name).join(", ")

  return {
    title: note.title,
    description: excerptText,
    keywords: keywords,
    openGraph: {
      title: note.title,
      description: excerptText,
      type: "article",
      publishedTime: note.createdAt.toISOString(),
      modifiedTime: note.updatedAt.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: note.title,
      description: excerptText,
    }
  }
}

export default async function NotePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const note = await prisma.note.findUnique({
    where: { slug },
    include: {
      tags: {
        include: {
          tag: true
        }
      }
    }
  })

  if (!note || note.isArchived) {
    notFound()
  }

  const readTime = getReadingTime(note.content)

  return (
    <div className="max-w-[800px] mx-auto px-6 py-12 md:py-20">
      <Link href="/notes" className="text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8 inline-block">
        &larr; Kembali ke Semua Catatan
      </Link>
      
      <article>
        <header className="mb-12 pb-8 border-b border-slate-200">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            {note.title}
          </h1>
          <div className="flex items-center flex-wrap gap-4 text-sm text-slate-500 mb-6">
            <div className="flex items-center">
              <span>{note.createdAt.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="mx-3">&middot;</span>
              <span>{readTime} min read</span>
              <span className="mx-3">&middot;</span>
              <span className="uppercase tracking-wider font-medium">{note.published ? 'Published' : 'Draft'}</span>
            </div>
            {note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {note.tags.map(nt => (
                  <Link key={nt.tag.id} href={`/tags/${nt.tag.slug}`}>
                    <Badge variant="secondary" className="hover:bg-slate-200 cursor-pointer">
                      {nt.tag.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </header>

        <MarkdownRenderer content={note.content} />
      </article>
    </div>
  )
}