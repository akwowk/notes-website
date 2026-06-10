"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import bcrypt from "bcryptjs"

export async function updatePassword(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Not authenticated" }
  }

  const oldPassword = formData.get("oldPassword")?.toString() || ""
  const newPassword = formData.get("newPassword")?.toString() || ""
  const confirmPassword = formData.get("confirmPassword")?.toString() || ""

  if (!oldPassword || !newPassword || !confirmPassword) {
    return { error: "Semua kolom password wajib diisi" }
  }

  if (newPassword !== confirmPassword) {
    return { error: "Konfirmasi sandi tidak cocok" }
  }

  if (newPassword.length < 6) {
    return { error: "Sandi baru minimal 6 karakter" }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user) {
      return { error: "User tidak ditemukan" }
    }

    const isValid = await bcrypt.compare(oldPassword, user.passwordHash)
    if (!isValid) {
      return { error: "Sandi lama tidak valid" }
    }

    const newHash = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
      where: { id: session.user.id },
      data: { passwordHash: newHash }
    })

    return { success: true }
  } catch (error) {
    console.error("Update password error:", error)
    return { error: "Gagal memperbarui sandi" }
  }
}
