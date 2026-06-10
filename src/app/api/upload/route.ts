import { NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"
import { auth } from "@/auth"

export async function POST(req: NextRequest) {
  // Hanya admin (authenticated user) yang bisa mengunggah gambar
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    
    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 })
    }

    // Validasi Ukuran File (Maksimal 5MB)
    const MAX_SIZE = 5 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File terlalu besar. Maksimal 5MB." }, { status: 400 })
    }

    // Validasi MIME Type (Hanya izinkan gambar)
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Tipe file tidak diizinkan. Hanya gambar yang diperbolehkan." }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    
    // Bikin nama file unik
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const ext = path.extname(file.name)
    const filename = `${uniqueSuffix}${ext}`

    // Simpan ke public/uploads
    const uploadDir = path.join(process.cwd(), "public/uploads")
    const filePath = path.join(uploadDir, filename)
    
    await writeFile(filePath, buffer)
    
    const fileUrl = `/uploads/${filename}`
    
    return NextResponse.json({ url: fileUrl })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed." }, { status: 500 })
  }
}
