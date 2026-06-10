"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"

export function SettingsForm({
  user,
  updateProfileAction,
  updatePasswordAction
}: {
  user: { name: string | null; email: string; image: string | null }
  updateProfileAction: (formData: FormData) => Promise<{ error?: string; success?: boolean }>
  updatePasswordAction: (formData: FormData) => Promise<{ error?: string; success?: boolean }>
}) {
  const [profileMsg, setProfileMsg] = useState({ type: "", text: "" })
  const [passwordMsg, setPasswordMsg] = useState({ type: "", text: "" })
  const [imageUrl, setImageUrl] = useState(user.image || "")
  const [isUploading, setIsUploading] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Gunakan metode konversi WebP dari MarkdownToolbar
  const convertToWebP = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
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
            const newName = file.name.replace(/\.[^/.]+$/, ".webp")
            const webpFile = new File([blob], newName, { type: "image/webp" })
            resolve(webpFile)
          },
          "image/webp",
          0.8
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
      const webpFile = await convertToWebP(originalFile)
      const formData = new FormData()
      formData.append("file", webpFile)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      })

      if (!res.ok) throw new Error("Gagal mengunggah foto")
      
      const data = await res.json()
      setImageUrl(data.url)
    } catch (error) {
      console.error(error)
      setProfileMsg({ type: "error", text: "Terjadi kesalahan saat mengunggah foto profil." })
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const onProfileSubmit = async (formData: FormData) => {
    setProfileMsg({ type: "", text: "" })
    formData.append("image", imageUrl)
    const result = await updateProfileAction(formData)
    
    if (result.error) {
      setProfileMsg({ type: "error", text: result.error })
    } else if (result.success) {
      setProfileMsg({ type: "success", text: "Profil berhasil diperbarui. Silakan refresh halaman jika nama tidak berubah." })
    }
  }

  const onPasswordSubmit = async (formData: FormData) => {
    setPasswordMsg({ type: "", text: "" })
    const result = await updatePasswordAction(formData)
    
    if (result.error) {
      setPasswordMsg({ type: "error", text: result.error })
    } else if (result.success) {
      setPasswordMsg({ type: "success", text: "Password berhasil diperbarui." })
      // Reset form (this requires a form ref or HTMLFormElement approach)
      const form = document.getElementById("passwordForm") as HTMLFormElement
      if (form) form.reset()
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Pengaturan Profil */}
      <section className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-900">Profil Publik</h3>
          <p className="text-xs text-slate-500 mt-1">Identitas admin untuk ditampilkan.</p>
        </div>
        
        <form action={onProfileSubmit} className="p-6 space-y-6">
          {profileMsg.text && (
            <div className={`p-3 text-sm rounded ${profileMsg.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {profileMsg.text}
            </div>
          )}
          
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-slate-200 flex shrink-0 items-center justify-center overflow-hidden border border-slate-300">
              {imageUrl ? (
                <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-slate-400 text-2xl font-bold uppercase">{user.name?.charAt(0) || user.email.charAt(0)}</span>
              )}
            </div>
            <div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
              <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                {isUploading ? "Mengunggah..." : "Ubah Foto WebP"}
              </Button>
              <p className="text-[10px] text-slate-500 mt-2">Gambar akan dikompres otomatis ke format WebP lokal.</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2" htmlFor="name">Nama Panggilan</label>
            <input
              id="name"
              name="name"
              defaultValue={user.name || ""}
              className="w-full h-10 px-3 border border-slate-200 rounded focus:border-slate-900 focus:outline-none text-sm transition-colors"
              placeholder="Contoh: Admin Ilham"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={user.email}
              className="w-full h-10 px-3 border border-slate-200 rounded focus:border-slate-900 focus:outline-none text-sm transition-colors bg-slate-50 text-slate-500"
              readOnly
            />
            <p className="text-[10px] text-slate-400 mt-1">Email admin tidak dapat diubah di sini demi keamanan (bisa memblokir login Anda).</p>
          </div>

          <Button type="submit" className="w-full">Simpan Profil</Button>
        </form>
      </section>

      {/* Pengaturan Password */}
      <section className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col h-fit">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-900">Keamanan</h3>
          <p className="text-xs text-slate-500 mt-1">Ganti kata sandi utama Anda secara berkala.</p>
        </div>
        
        <form id="passwordForm" action={onPasswordSubmit} className="p-6 space-y-6">
          {passwordMsg.text && (
            <div className={`p-3 text-sm rounded ${passwordMsg.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {passwordMsg.text}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2" htmlFor="oldPassword">Sandi Lama</label>
            <input
              id="oldPassword"
              name="oldPassword"
              type="password"
              className="w-full h-10 px-3 border border-slate-200 rounded focus:border-slate-900 focus:outline-none text-sm transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2" htmlFor="newPassword">Sandi Baru</label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              className="w-full h-10 px-3 border border-slate-200 rounded focus:border-slate-900 focus:outline-none text-sm transition-colors"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2" htmlFor="confirmPassword">Konfirmasi Sandi Baru</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="w-full h-10 px-3 border border-slate-200 rounded focus:border-slate-900 focus:outline-none text-sm transition-colors"
              required
              minLength={6}
            />
          </div>

          <Button type="submit" variant="destructive" className="w-full">Perbarui Sandi</Button>
        </form>
      </section>
    </div>
  )
}
