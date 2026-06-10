import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

async function main() {
  const passwordHash = await bcrypt.hash(
    "ILHAM2705I@i",
    12
  )

  await prisma.user.create({
    data: {
      email: "transcler@catatanku.site",
      passwordHash
    }
  })

  console.log("admin created")
}

main()