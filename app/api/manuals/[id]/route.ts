import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {

  const session = await getServerSession(authOptions)

  // verificar si es admin
  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { error: "No autorizado" },
      { status: 401 }
    )
  }

  await prisma.manual.delete({
    where: {
      id: params.id
    }
  })

  return NextResponse.json({
    message: "Manual eliminado"
  })

}