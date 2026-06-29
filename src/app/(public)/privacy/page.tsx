export const metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan Privasi terkait pengumpulan dan penggunaan data pada platform Notes App.",
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
      <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">Kebijakan Privasi</h1>
      
      <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed">
        <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</p>
        
        <p>
          Kami sangat menghargai privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda ketika Anda mengunjungi situs web kami.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. Informasi yang Kami Kumpulkan</h2>
        <p>
          Sebagai pembaca publik, kami tidak mewajibkan Anda untuk membuat akun atau memberikan informasi pribadi (seperti nama atau alamat email) untuk membaca catatan di situs ini. Namun, sistem pihak ketiga yang kami gunakan mungkin mengumpulkan data analitik standar seperti:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Alamat IP Anda.</li>
          <li>Jenis peramban web dan sistem operasi yang digunakan.</li>
          <li>Halaman yang Anda kunjungi di dalam situs kami.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. Cookies & Jaringan Iklan</h2>
        <p>
          Kami menggunakan pihak ketiga, seperti <strong>Google AdSense</strong>, untuk menayangkan iklan saat Anda mengunjungi situs web kami. Vendor pihak ketiga ini, termasuk Google, menggunakan <em>cookies</em> untuk menayangkan iklan berdasarkan kunjungan Anda sebelumnya ke situs web kami atau situs web lain di internet.
        </p>
        <p>
          Penggunaan <em>cookies</em> periklanan oleh Google memungkinkannya dan mitranya untuk menayangkan iklan kepada pengguna Anda berdasarkan kunjungan mereka ke situs Anda dan/atau situs lain di internet. Pengguna dapat memilih untuk tidak ikut serta dalam iklan hasil personalisasi dengan mengunjungi <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Setelan Iklan Google</a>.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Keamanan Data</h2>
        <p>
          Kami berusaha melindungi keamanan informasi yang secara tidak langsung terkumpul. Situs web kami menggunakan enkripsi standar (HTTPS) untuk memastikan sesi penelusuran yang aman bagi Anda.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. Perubahan Kebijakan</h2>
        <p>
          Kami berhak untuk mengubah atau memperbarui Kebijakan Privasi ini kapan saja tanpa pemberitahuan sebelumnya. Kami mendorong Anda untuk meninjau halaman ini secara berkala untuk mengetahui perubahan apa pun.
        </p>
      </div>
    </div>
  )
}
