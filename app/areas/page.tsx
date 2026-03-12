import { prisma } from "@/lib/prisma"
import Link from "next/link"

async function getAreas() {
  const areas = await prisma.area.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  return areas
}

export default async function AreasPage() {
  const areas = await getAreas()

  return (
    <div style={{ padding: "40px" }}>
      <h1>Áreas</h1>

      {areas.map((area) => (
        <div
          key={area.id}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginTop: "20px"
          }}
        >
          <h2>{area.name}</h2>

          <p>{area.description}</p>

          <Link href={`/areas/${area.id}`}>
            Ver área
          </Link>

          {area.qrCode && (
            <div style={{ marginTop: "10px" }}>
              <img src={area.qrCode} width={300} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}