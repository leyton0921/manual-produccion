import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import QRCode from "qrcode"

export async function GET() {

  const areas = await prisma.area.findMany({
    orderBy: { createdAt: "desc" },
    include:{
      manuals:true
    }
  })

  return NextResponse.json(areas)
}

export async function POST(request: Request) {

  const body = await request.json()

  const area = await prisma.area.create({
    data:{
      name: body.name,
      description: body.description
    }
  })

  const areaUrl = `http://localhost:3000/areas/${area.id}`

  const qrCode = await QRCode.toDataURL(areaUrl)

  const updatedArea = await prisma.area.update({
    where:{ id: area.id },
    data:{ qrCode }
  })

  return NextResponse.json(updatedArea)

}

export async function DELETE(request: Request){

  const { id } = await request.json()

  await prisma.manual.deleteMany({
    where:{ areaId:id }
  })

  await prisma.area.delete({
    where:{ id }
  })

  return NextResponse.json({message:"Area eliminada"})
}