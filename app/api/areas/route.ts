import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import QRCode from "qrcode"

export async function GET() {

  const areas = await prisma.area.findMany({
    orderBy: { createdAt: "desc" }
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

  const url = `${process.env.NEXT_PUBLIC_URL}/areas/${area.id}`

  const qrCode = await QRCode.toDataURL(url)

  const updatedArea = await prisma.area.update({
    where:{ id: area.id },
    data:{ qrCode }
  })

  return NextResponse.json(updatedArea)

}