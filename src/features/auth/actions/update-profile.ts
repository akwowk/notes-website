"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function updateProfile(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Not authenticated" }
  }

  const name = formData.get("name")?.toString() || ""
  const email = formData.get("email")?.toString() || ""
  const image = formData.get("image")?.toString() || "" // ini akan berupa URL setelah diunggah ke /api/upload

  if (!email) {
    return { error: "Email wajib diisi" }
  }

  try {
    // Pastikan email tidak digunakan oleh user lain
    if (email !== session.user.email) {
      const existing = await prisma.user.findUnique({ where: { email } })
      if (existing) {
        return { error: "Email sudah digunakan" }
      }
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        email,
        image: image || null
      }
    })

    return { success: true }
  } catch (error) {
    console.error("Update profile error:", error)
    return { error: "Gagal memperbarui profil" }
  }
}
