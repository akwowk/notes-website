export const metadata = {
  title: "Tentang Kami",
  description: "Pelajari lebih lanjut tentang tujuan dan visi di balik proyek Knowledge Base kami.",
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
      <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">Tentang Kami</h1>
      
      <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed">
        <p>
          Selamat datang di halaman Knowledge Base pribadi kami. Platform ini diciptakan sebagai ruang digital bebas distraksi tempat ide, penemuan teknis, dan catatan pembelajaran disimpan secara permanen.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Misi Kami</h2>
        <p>
          Dalam era membludaknya informasi, kami percaya bahwa dokumentasi yang rapi dan dapat dicari adalah kunci dari produktivitas. Misi kami adalah berbagi pengetahuan—mulai dari dasar-dasar pengembangan perangkat lunak, penyelesaian bug, hingga filosofi desain—secara terbuka agar dapat memberikan manfaat bagi kami sendiri di masa depan, maupun bagi para pembaca publik.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Filosofi Desain</h2>
        <p>
          Anda mungkin menyadari antarmuka kami sangat minimalis. Ini bukanlah suatu kebetulan. Kami menerapkan prinsip <em>Sederhana Saja</em> dengan mengurangi elemen visual yang tidak perlu seperti ikon yang berlebihan, warna yang mencolok, atau pop-up. Fokus utama situs ini adalah <strong>keterbacaan</strong>.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Hubungi Kami</h2>
        <p>
          Situs ini dikelola secara pribadi. Jika Anda memiliki pertanyaan lebih lanjut atau ingin berdiskusi mengenai catatan yang ada di situs ini, Anda dapat menghubungi admin melalui platform media sosial atau GitHub.
        </p>
      </div>
    </div>
  )
}
