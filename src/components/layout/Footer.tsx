import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 mt-auto py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-4 text-sm text-slate-500">
        <div className="flex gap-4 sm:gap-6 font-medium">
          <Link href="/about" className="hover:text-slate-900 transition-colors">Tentang Kami</Link>
          <Link href="/privacy" className="hover:text-slate-900 transition-colors">Kebijakan Privasi</Link>
          <Link href="/terms" className="hover:text-slate-900 transition-colors">Syarat & Ketentuan</Link>
        </div>
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} Notes App.</p>
          <p className="mt-1">Terima Kasih</p>
        </div>
      </div>
    </footer>
  )
}
