import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {

  const { id } = await context.params

  await prisma.manual.delete({
    where: {
      id: id
    }
  })

  return NextResponse.json({
    message: "Manual eliminado"
  })

}