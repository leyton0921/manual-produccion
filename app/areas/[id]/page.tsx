import { prisma } from "@/lib/prisma"

export default async function AreaPage({
  params
}:{
  params: Promise<{ id: string }>
}){

  const { id } = await params

  const area = await prisma.area.findUnique({
    where:{ id },
    include:{
      manuals:true
    }
  })

  if(!area){
    return <div>Área no encontrada</div>
  }

  return(

    <div style={{padding:"40px"}}>

      <h1>{area.name}</h1>

      <p>{area.description}</p>

      {area.qrCode && (
        <img src={area.qrCode} width="200"/>
      )}

      <h2>Manuales</h2>

      {area.manuals.length === 0 && (
        <p>No hay manuales</p>
      )}

      {area.manuals.map((manual)=>{

        if(manual.fileType?.includes("image")){
          return (
            <div key={manual.id}>
              <img src={manual.fileUrl} width="300"/>
            </div>
          )
        }

        if(manual.fileType?.includes("video")){
          return (
            <div key={manual.id}>
              <video src={manual.fileUrl} controls width="400"/>
            </div>
          )
        }

        if(manual.fileType?.includes("pdf")){
          return (
            <div key={manual.id}>
              <iframe src={manual.fileUrl} width="600" height="400"/>
            </div>
          )
        }

      })}

    </div>

  )

}