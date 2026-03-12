"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function AdminAreas(){

const [areas,setAreas] = useState<any[]>([])
const [name,setName] = useState("")
const [description,setDescription] = useState("")

const loadAreas = async()=>{

const res = await fetch("/api/areas")
const data = await res.json()

setAreas(data)

}

useEffect(()=>{
loadAreas()
},[])

const createArea = async(e:any)=>{

e.preventDefault()

await fetch("/api/areas",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name,
description
})
})

setName("")
setDescription("")

loadAreas()

}

const deleteArea = async(id:string)=>{

if(!confirm("Eliminar área?")) return

await fetch("/api/areas",{
method:"DELETE",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({id})
})

loadAreas()

}

return(

<div style={{padding:"40px"}}>

<h1>Panel de Áreas</h1>

{/* CREAR AREA */}

<div style={{
border:"1px solid #ddd",
padding:"20px",
marginBottom:"30px"
}}>

<h2>Nueva Área</h2>

<form onSubmit={createArea}>

<input
placeholder="Nombre"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<br/><br/>

<input
placeholder="Descripción"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<br/><br/>

<button>
Crear Área
</button>

</form>

</div>

{/* LISTA */}

{areas.map((area)=>(

<div
key={area.id}
style={{
border:"1px solid #ccc",
padding:"20px",
marginBottom:"20px"
}}
>

<h2>{area.name}</h2>

<p>{area.description}</p>

<p>
Manuals: {area.manuals.length}
</p>

{area.qrCode && (

<img
src={area.qrCode}
width="120"
/>

)}

<br/><br/>

<Link href={`/areas/${area.id}`}>
<button>
Ver Área
</button>
</Link>

<Link href={`/admin/manuals?areaId=${area.id}`}>
<button style={{marginLeft:"10px"}}>
Agregar Manual
</button>
</Link>

<a
href={area.qrCode}
download={`qr-${area.name}.png`}
>

<button style={{marginLeft:"10px"}}>
Descargar QR
</button>

</a>

<button
onClick={()=>deleteArea(area.id)}
style={{
marginLeft:"10px",
background:"red",
color:"white"
}}
>

Eliminar

</button>

</div>

))}

</div>

)

}