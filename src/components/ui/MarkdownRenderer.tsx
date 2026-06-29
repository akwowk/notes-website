import React from "react"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkBreaks from "remark-breaks"
import rehypeKatex from "rehype-katex"
import rehypePrettyCode from "rehype-pretty-code"

interface MarkdownRendererProps {
  content: string
}

export async function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkBreaks)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypePrettyCode, { theme: "one-dark-pro" })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  const html = String(file)

  return (
    <div 
      className="max-w-none w-full text-slate-800 leading-relaxed
      [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-slate-900 [&_h1]:mt-8 [&_h1]:mb-4
      [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-8 [&_h2]:mb-4
      [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-6 [&_h3]:mb-3
      [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-slate-900 [&_h4]:mt-6 [&_h4]:mb-2
      [&_p]:mb-4
      [&_a]:text-blue-600 [&_a]:underline-offset-4 hover:[&_a]:underline
      [&_blockquote]:border-l-4 [&_blockquote]:border-slate-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-600 [&_blockquote]:my-6
      [&_strong]:font-bold [&_strong]:text-slate-900
      [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
      [&_li]:mb-1
      [&_table]:w-full [&_table]:border-collapse [&_table]:mb-6
      [&_th]:border [&_th]:border-slate-200 [&_th]:bg-slate-50 [&_th]:p-3 [&_th]:text-left [&_th]:font-bold
      [&_td]:border [&_td]:border-slate-200 [&_td]:p-3
      [&_img]:rounded-xl [&_img]:border [&_img]:border-slate-200 [&_img]:my-6
      [&_hr]:my-8 [&_hr]:border-slate-200
      [&_.math-display]:overflow-x-auto [&_.math-display]:py-4 [&_.math-display]:text-center
      [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:bg-slate-900 [&_pre]:text-slate-50 [&_pre]:overflow-x-auto [&_pre]:text-sm
      [&_code:not(pre_code)]:bg-slate-100 [&_code:not(pre_code)]:text-slate-800 [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:rounded-md [&_code:not(pre_code)]:text-sm [&_code:not(pre_code)]:font-mono
      [&_figure[data-rehype-pretty-code-figure]_pre]:bg-slate-900
      [&_figure[data-rehype-pretty-code-figure]]:my-6
      [&_span[data-line]]:block
      "
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
