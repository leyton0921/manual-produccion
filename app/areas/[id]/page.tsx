import { prisma } from "@/lib/prisma"

export default async function AreaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params

  const area = await prisma.area.findUnique({
    where: { id },
    include: {
      manuals: true
    }
  })

  if (!area) {
    return <div>Área no encontrada</div>
  }

  return (
    <div style={{ padding: "40px" }}>

      <h1>{area.name}</h1>
      <p>{area.description}</p>

      {area.qrCode && (
        <div>
          <h3>QR del área</h3>
          <img src={area.qrCode} width={250} />
        </div>
      )}

      <h2>Manuales</h2>

      {area.manuals.length === 0 && (
        <p>No hay manuales disponibles</p>
      )}

      {area.manuals.map((manual) => {

        if (!manual.fileType) {
          return (
            <a key={manual.id} href={manual.fileUrl} target="_blank">
              {manual.title}
            </a>
          )
        }

        if (manual.fileType.includes("image")) {
          return (
            <img
              key={manual.id}
              src={manual.fileUrl}
              width={300}
            />
          )
        }

        if (manual.fileType.includes("video")) {
          return (
            <video key={manual.id} controls width="400">
              <source src={manual.fileUrl} />
            </video>
          )
        }

        if (manual.fileType.includes("pdf")) {
          return (
            <iframe
              key={manual.id}
              src={manual.fileUrl}
              width="600"
              height="500"
            />
          )
        }

        return null
      })}

    </div>
  )
}