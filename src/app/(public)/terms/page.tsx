export const metadata = {
  title: "Syarat & Ketentuan",
  description: "Syarat dan Ketentuan penggunaan layanan platform Notes App.",
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
      <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">Syarat & Ketentuan</h1>
      
      <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed">
        <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</p>
        
        <p>
          Selamat datang di situs *Knowledge Base* kami. Dengan mengakses dan membaca konten di situs web ini, Anda menyetujui untuk terikat dengan Syarat dan Ketentuan penggunaan ini.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. Penggunaan Konten</h2>
        <p>
          Seluruh konten (teks, kode, dan gambar) yang disediakan dalam catatan-catatan di situs ini ditujukan semata-mata untuk tujuan informasi dan pembelajaran umum. Pengguna diizinkan untuk mengutip atau membagikan tautan ke konten situs ini dengan memberikan atribusi atau kredit yang sesuai kepada penulis atau situs ini.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. Penafian Tanggung Jawab (Disclaimer)</h2>
        <p>
          Kami berupaya untuk menyajikan informasi yang akurat dan *up-to-date*. Namun, kami tidak memberikan jaminan apa pun mengenai kelengkapan, keandalan, atau keakuratan informasi tersebut. Segala tindakan yang Anda lakukan berdasarkan informasi yang Anda temukan di situs ini adalah sepenuhnya risiko Anda sendiri.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Tautan Eksternal</h2>
        <p>
          Situs kami mungkin memuat tautan ke situs web pihak ketiga (seperti referensi dokumentasi atau Github). Tautan-tautan tersebut disediakan untuk kenyamanan Anda. Kami tidak memiliki kendali atas isi situs pihak ketiga dan tidak bertanggung jawab atas kerugian atau kerusakan yang mungkin timbul dari penggunaan Anda atas situs tersebut.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. Perubahan Syarat</h2>
        <p>
          Syarat dan Ketentuan ini dapat direvisi kapan saja. Dengan terus menggunakan situs ini setelah perubahan diposting, Anda menyatakan persetujuan Anda terhadap persyaratan yang dimodifikasi.
        </p>
      </div>
    </div>
  )
}
