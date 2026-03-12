"use client"

import { useState } from "react"

export default function UploadManual() {

  const [title,setTitle] = useState("")
  const [areaId,setAreaId] = useState("")
  const [file,setFile] = useState<File | null>(null)

  const handleSubmit = async (e:any)=>{
    e.preventDefault()

    const formData = new FormData()

    formData.append("title",title)
    formData.append("areaId",areaId)

    if(file){
      formData.append("file",file)
    }

    await fetch("/api/upload",{
      method:"POST",
      body:formData
    })

    alert("Archivo subido")
  }

  return(

    <div>

      <h1>Subir Manual</h1>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Título"
          onChange={(e)=>setTitle(e.target.value)}
        />

        <input
          placeholder="Area ID"
          onChange={(e)=>setAreaId(e.target.value)}
        />

        <input
          type="file"
          onChange={(e)=>setFile(e.target.files?.[0] || null)}
        />

        <button>
          Subir
        </button>

      </form>

    </div>

  )
}