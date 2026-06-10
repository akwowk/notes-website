import { prisma } from "@/lib/prisma"
import { createTag } from "@/features/tags/actions/create-tag"
import { deleteTag } from "@/features/tags/actions/delete-tag"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/EmptyState"

export default async function TagsPage() {
  const tags = await prisma.tag.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { notes: true }
      }
    }
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">Buat Tag Baru</h2>
          <p className="text-xs text-slate-500 mt-1">Tambahkan label untuk mengorganisir catatan.</p>
        </div>
        
        <Card className="p-4">
          <form action={createTag} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                Nama Tag
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                minLength={2}
                maxLength={50}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 text-sm"
                placeholder="Contoh: React, Tutorial"
              />
            </div>
            <Button type="submit" className="w-full">Simpan Tag</Button>
          </form>
        </Card>
      </div>

      <div className="md:col-span-2">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">Daftar Tag</h2>
          <p className="text-xs text-slate-500 mt-1">Kelola semua tag yang tersedia di knowledge base.</p>
        </div>

        <Card className="overflow-hidden">
          <div className="grid grid-cols-12 px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <div className="col-span-6">Nama Tag</div>
            <div className="col-span-3">Jumlah Catatan</div>
            <div className="col-span-3 text-right">Aksi</div>
          </div>
          
          {tags.length === 0 ? (
            <EmptyState 
              title="Tidak Ada Tag"
              description="Anda belum membuat tag apapun. Buat tag menggunakan form di samping."
            />
          ) : (
            <ul className="divide-y divide-slate-200 text-sm">
              {tags.map((tag) => (
                <li key={tag.id} className="grid grid-cols-12 px-6 py-4 items-center hover:bg-slate-50 transition-colors">
                  <div className="col-span-6 pr-4">
                    <div className="font-medium text-slate-900">{tag.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{tag.slug}</div>
                  </div>
                  <div className="col-span-3 text-slate-600">
                    {tag._count.notes} Catatan
                  </div>
                  <div className="col-span-3 flex justify-end">
                    <form action={deleteTag.bind(null, tag.id)}>
                      <Button variant="destructive" size="sm" type="submit">
                        Hapus
                      </Button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  )
}
