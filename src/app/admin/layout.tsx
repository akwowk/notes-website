import { auth } from "@/auth"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/layout/AdminSidebar"
import { AdminHeader } from "@/components/layout/AdminHeader"

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="text-sm bg-slate-50 text-slate-900 min-h-screen">
      <AdminSidebar />
      <div className="md:ml-[280px]">
        <AdminHeader 
          userEmail={session.user?.email} 
          userName={session.user?.name}
          userImage={session.user?.image}
        />
        <main className="p-6 max-w-5xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}