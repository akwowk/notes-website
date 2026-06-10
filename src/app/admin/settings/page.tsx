import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { updateProfile } from "@/features/auth/actions/update-profile"
import { updatePassword } from "@/features/auth/actions/update-password"
import { SettingsForm } from "@/components/features/auth/SettingsForm"

export default async function SettingsPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, image: true }
  })

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900">Pengaturan Akun</h2>
        <p className="text-sm text-slate-500 mt-1">Kelola profil publik dan keamanan akun administrator Anda.</p>
      </div>

      <SettingsForm 
        user={{ name: user.name, email: user.email, image: user.image }} 
        updateProfileAction={updateProfile} 
        updatePasswordAction={updatePassword} 
      />
    </div>
  )
}
