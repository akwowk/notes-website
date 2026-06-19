import { prisma } from "@/lib/prisma"
import { AddVocabularyForm } from "@/components/features/vocabulary/AddVocabularyForm"
import { DeleteVocabularyButton } from "@/components/features/vocabulary/DeleteVocabularyButton"

export const metadata = {
  title: "Kosakata - Admin",
}

export default async function VocabularyPage() {
  const vocabularies = await prisma.vocabulary.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="max-w-4xl mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Kosakata</h1>
        <p className="text-sm text-slate-500">Kelola daftar kata terjemahan asing Anda.</p>
      </header>

      <AddVocabularyForm />

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
        {vocabularies.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500">
            Belum ada kosakata yang disimpan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
                  <th className="px-6 py-4 font-bold w-1/4">Kata</th>
                  <th className="px-6 py-4 font-bold w-1/4">Terjemahan</th>
                  <th className="px-6 py-4 font-bold w-2/4">Catatan</th>
                  <th className="px-6 py-4 font-bold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {vocabularies.map((vocab) => (
                  <tr key={vocab.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{vocab.word}</td>
                    <td className="px-6 py-4 text-slate-700">{vocab.translation}</td>
                    <td className="px-6 py-4 text-slate-500 text-xs">{vocab.notes || "-"}</td>
                    <td className="px-6 py-4 text-right">
                      <DeleteVocabularyButton id={vocab.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
