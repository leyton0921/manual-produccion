import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {

  const { id } = await context.params

  try {

    await prisma.manual.delete({
      where: { id }
    })

    return NextResponse.json({
      message: "Manual eliminado"
    })

  } catch (error) {

    return NextResponse.json(
      { error: "Error eliminando manual" },
      { status: 500 }
    )

  }

}