import { prisma } from "@/lib/prisma"

async function deleteManual(id:string){

  await fetch(`/api/manuals/${id}`,{
    method:"DELETE"
  })

  location.reload()

}

export default async function AreaPage({
  params
}:{
  params:{id:string}
}){

  const area = await prisma.area.findUnique({
    where:{ id:params.id },
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

          return(

            <div key={manual.id} style={{marginBottom:"20px"}}>

              <img src={manual.fileUrl} width="300"/>

              <br/>

              <button
                onClick={()=>deleteManual(manual.id)}
              >
                Eliminar
              </button>

            </div>

          )

        }

        if(manual.fileType?.includes("video")){

          return(

            <div key={manual.id}>

              <video
                src={manual.fileUrl}
                controls
                width="400"
              />

              <br/>

              <button
                onClick={()=>deleteManual(manual.id)}
              >
                Eliminar
              </button>

            </div>

          )

        }

        if(manual.fileType?.includes("pdf")){

          return(

            <div key={manual.id}>

              <iframe
                src={manual.fileUrl}
                width="600"
                height="400"
              />

              <br/>

              <button
                onClick={()=>deleteManual(manual.id)}
              >
                Eliminar
              </button>

            </div>

          )

        }

      })}

    </div>

  )

}