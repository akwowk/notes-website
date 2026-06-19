import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const note = await prisma.note.create({
      data: {
        title: 'React Hooks',
        slug: 'react-hooks-test-page',
        excerpt: 'Panduan lengkap mengenai React state hook dan cara menggunakannya.',
        content: `# React Hooks\n\n## useState\n\nReact state hook.\n\n### Formula\n\n$$\na^2+b^2=c^2\n$$\n\n### Checklist\n\n- [x] Install\n- [ ] Learn deeply\n\n### Code\n\n\`\`\`ts\nconst [count, setCount] =\n  useState(0);\n\`\`\`\n\n> Important note.`,
        published: true
      }
    })
    return NextResponse.json({ success: true, slug: note.slug })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error occurred"
    return NextResponse.json({ success: false, error: message })
  }
}
