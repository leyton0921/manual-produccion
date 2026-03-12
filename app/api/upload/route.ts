import { writeFile } from "fs/promises"
import { prisma } from "@/lib/prisma"
import path from "path"

export async function POST(req: Request) {

  const data = await req.formData()

  const file = data.get("file") as File
  const title = data.get("title") as string
  const areaId = data.get("areaId") as string

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const filePath = path.join(process.cwd(), "public/uploads", file.name)

  await writeFile(filePath, buffer)

  const fileUrl = `/uploads/${file.name}`

  const manual = await prisma.manual.create({
    data: {
      title,
      fileUrl,
      fileType: file.type,
      areaId
    }
  })

  return Response.json(manual)
}