"use client"

import { useRef, useState } from "react"

interface MarkdownToolbarProps {
  textareaId: string
}

export function MarkdownToolbar({ textareaId }: MarkdownToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  // Fungsi utilitas untuk menyisipkan teks ke dalam textarea
  const insertText = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById(textareaId) as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    
    // Teks yang akan disisipkan
    const insertion = `${prefix}${selectedText}${suffix}`
    
    // Ganti nilai textarea
    textarea.value = 
      textarea.value.substring(0, start) + 
      insertion + 
      textarea.value.substring(end)
    
    // Kembalikan fokus ke textarea dan atur posisi kursor
    textarea.focus()
    // Jika ada suffix, letakkan kursor di dalam (antara prefix dan suffix)
    // Jika tidak ada teks yang diblok, letakkan kursor di tengah
    if (selectedText.length === 0 && suffix.length > 0) {
      textarea.setSelectionRange(start + prefix.length, start + prefix.length)
    } else {
      textarea.setSelectionRange(start + insertion.length, start + insertion.length)
    }

    // Pemicu event 'change' manual agar React (seperti onChange handler) menyadarinya
    const event = new Event('change', { bubbles: true })
    textarea.dispatchEvent(event)
  }

  const convertToWebP = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      // Jika file sudah webp, kembalikan saja
      if (file.type === "image/webp") return resolve(file)
      
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        
        const ctx = canvas.getContext("2d")
        if (!ctx) return reject(new Error("Failed to get canvas context"))
        
        ctx.drawImage(img, 0, 0)
        
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Canvas to Blob failed"))
            // Ganti ekstensi file menjadi .webp
            const newName = file.name.replace(/\.[^/.]+$/, ".webp")
            const webpFile = new File([blob], newName, { type: "image/webp" })
            resolve(webpFile)
          },
          "image/webp",
          0.8 // Kualitas gambar 80%
        )
      }
      img.onerror = () => reject(new Error("Failed to load image"))
      img.src = URL.createObjectURL(file)
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const originalFile = e.target.files?.[0]
    if (!originalFile) return

    setIsUploading(true)
    try {
      // Konversi ke WebP di sisi klien sebelum diunggah
      const webpFile = await convertToWebP(originalFile)

      const formData = new FormData()
      formData.append("file", webpFile)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      })

      if (!res.ok) throw new Error("Gagal mengunggah gambar")
      
      const data = await res.json()
      // Sisipkan markdown gambar dengan nama file WebP
      insertText(`![${webpFile.name}](${data.url})`, "")
    } catch (error) {
      console.error(error)
      alert("Terjadi kesalahan saat mengunggah gambar.")
    } finally {
      setIsUploading(false)
      // Reset input file
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border border-b-0 border-slate-200 rounded-t-xl font-mono text-xs font-bold text-slate-600">
      <ToolbarButton text="[B]" title="Bold" onClick={() => insertText("**", "**")} />
      <ToolbarButton text="[I]" title="Italic" onClick={() => insertText("_", "_")} />
      <div className="w-px h-4 bg-slate-300 mx-1" />
      <ToolbarButton text="[H2]" title="Heading 2" onClick={() => insertText("## ")} />
      <ToolbarButton text="[>]" title="Blockquote" onClick={() => insertText("> ")} />
      <ToolbarButton text="[Code]" title="Code Block" onClick={() => insertText("```\n", "\n```")} />
      <div className="w-px h-4 bg-slate-300 mx-1" />
      <ToolbarButton text="[Task]" title="Task List" onClick={() => insertText("- [ ] ")} />
      <ToolbarButton 
        text="[Table]" 
        title="Table" 
        onClick={() => insertText("\n| Header | Header |\n|--------|--------|\n| Cell   | Cell   |\n")} 
      />
      <ToolbarButton text="[Math]" title="Math Formula" onClick={() => insertText("$$\n", "\n$$")} />
      <div className="w-px h-4 bg-slate-300 mx-1" />
      
      {/* Tombol Upload Gambar */}
      <button
        type="button"
        title="Upload Image"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="px-2 py-1 text-slate-600 hover:bg-slate-200 hover:text-slate-900 rounded transition-colors disabled:opacity-50"
      >
        [Image]
      </button>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        accept="image/*" 
        className="hidden" 
      />
      
      {isUploading && <span className="text-[10px] text-slate-500 ml-2 animate-pulse uppercase tracking-wider">Mengunggah...</span>}
    </div>
  )
}

function ToolbarButton({ text, title, onClick }: { text: string, title: string, onClick: () => void }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="px-2 py-1 text-slate-600 hover:bg-slate-200 hover:text-slate-900 rounded transition-colors"
    >
      {text}
    </button>
  )
}
