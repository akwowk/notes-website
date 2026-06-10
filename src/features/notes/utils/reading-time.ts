export function getReadingTime(text: string): number {
  if (!text) return 1
  
  // Asumsikan kecepatan membaca rata-rata adalah 200 kata per menit
  const WORDS_PER_MINUTE = 200
  
  // Hapus karakter markdown dasar untuk akurasi (opsional)
  const plainText = text.replace(/[#*`_\[\]()]/g, "")
  
  const words = plainText.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}
