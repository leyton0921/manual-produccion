import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const body = await req.json()

  const manual = await prisma.manual.create({
    data: {
      title: body.title,
      fileUrl: body.fileUrl,
      fileType: body.fileType,
      areaId: body.areaId
    }
  })

  return NextResponse.json(manual)
}

export async function DELETE(request:Request){

const { id } = await request.json()

await prisma.manual.delete({
where:{ id }
})

return NextResponse.json({message:"Manual eliminado"})

}