import { useState } from "react";

const API_KEY = "";

export default function App() {

const [ratio,setRatio] = useState("1:1")
const [gender,setGender] = useState("wanita")
const [loading,setLoading] = useState(false)
const [image,setImage] = useState(null)

const [age,setAge] = useState("young adult 20-30")
const [hair,setHair] = useState("short hair")
const [origin,setOrigin] = useState("Asian")
const [atmosphere,setAtmosphere] = useState("daylight, bright natural lighting")

const [skin,setSkin] = useState("")
const [eye,setEye] = useState("")
const [misc,setMisc] = useState("")

async function generateCharacter(){

setLoading(true)
setImage(null)

const skinCustom = skin || "natural texture"
const eyeCustom = eye || "detailed"

const prompt = `
Full body professional advertising photography,
${origin} ${gender}, ${age}, ${hair},
atmosphere ${atmosphere},
ultra photorealistic,
hyper detailed skin (${skinCustom}),
eye details ${eyeCustom},
${misc},
8k resolution commercial photography
`

try{

const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
instances:[{prompt}],
parameters:{
sampleCount:1,
aspectRatio:ratio
}
})
})

const data = await response.json()

const base64 = data?.predictions?.[0]?.bytesBase64Encoded

if(base64){
setImage(`data:image/png;base64,${base64}`)
}else{
alert("Generate gagal")
}

}catch(e){
console.error(e)
alert("Error generate image")
}

setLoading(false)

}

function downloadImage(){

if(!image) return

const link = document.createElement("a")
link.href = image
link.download = "hackreality.png"
link.click()

}

return (

<div className="min-h-screen flex flex-col items-center justify-center p-4 bg-zinc-50">

<div className="w-full max-w-7xl min-h-[85vh] flex flex-col lg:flex-row gap-8 py-6">

{/* LEFT PANEL */}

<div className="w-full lg:w-80 space-y-4">

<div>

<h2 className="text-xl font-bold">Studio Panel</h2>
<p className="text-xs text-zinc-500">Character Config</p>

</div>

<div className="bg-white p-6 rounded-3xl shadow space-y-5">

{/* RATIO */}

<div>

<label className="text-xs font-bold">Aspect Ratio</label>

<div className="grid grid-cols-3 gap-2 mt-2">

<button onClick={()=>setRatio("1:1")} className="border p-2 rounded">
1:1
</button>

<button onClick={()=>setRatio("9:16")} className="border p-2 rounded">
9:16
</button>

<button onClick={()=>setRatio("16:9")} className="border p-2 rounded">
16:9
</button>

</div>

</div>

{/* GENDER */}

<div>

<label className="text-xs font-bold">Gender</label>

<div className="grid grid-cols-2 gap-2 mt-2">

<button onClick={()=>setGender("pria")} className="border p-2 rounded">
Pria
</button>

<button onClick={()=>setGender("wanita")} className="border p-2 rounded">
Wanita
</button>

</div>

</div>

{/* AGE */}

<div>

<label className="text-xs font-bold">Age</label>

<select
className="w-full border p-2 rounded mt-1"
onChange={e=>setAge(e.target.value)}
>

<option value="child">Anak</option>
<option value="teenager">Remaja</option>
<option value="young adult 20-30">20-30</option>
<option value="mature 40-50">40-50</option>

</select>

</div>

{/* HAIR */}

<div>

<label className="text-xs font-bold">Hair</label>

<select
className="w-full border p-2 rounded mt-1"
onChange={e=>setHair(e.target.value)}
>

<option value="short hair">Short</option>
<option value="long straight hair">Long</option>
<option value="curly hair">Curly</option>

</select>

</div>

{/* ORIGIN */}

<div>

<label className="text-xs font-bold">Origin</label>

<select
className="w-full border p-2 rounded mt-1"
onChange={e=>setOrigin(e.target.value)}
>

<option value="Asian">Asian</option>
<option value="Japanese">Japanese</option>
<option value="Korean">Korean</option>

</select>

</div>

{/* ATMOSPHERE */}

<div>

<label className="text-xs font-bold">Atmosphere</label>

<select
className="w-full border p-2 rounded mt-1"
onChange={e=>setAtmosphere(e.target.value)}
>

<option value="daylight, bright natural lighting">
Daylight
</option>

<option value="golden hour, warm sunset lighting">
Golden Hour
</option>

<option value="clean studio lighting">
Studio
</option>

</select>

</div>

{/* MICRO */}

<div>

<input
placeholder="Skin detail"
className="w-full border p-2 rounded mt-2"
onChange={e=>setSkin(e.target.value)}
/>

<input
placeholder="Eye detail"
className="w-full border p-2 rounded mt-2"
onChange={e=>setEye(e.target.value)}
/>

<input
placeholder="Additional note"
className="w-full border p-2 rounded mt-2"
onChange={e=>setMisc(e.target.value)}
/>

</div>

<button
onClick={generateCharacter}
className="w-full bg-black text-white py-3 rounded-xl mt-4"
>

{loading ? "Generating..." : "Generate 8K"}

</button>

</div>

</div>

{/* PREVIEW */}

<div className="flex-1 flex flex-col gap-4">

<div className="w-full flex items-center justify-center bg-zinc-100 rounded-3xl p-4 min-h-[600px]">

{!image && !loading && (
<p className="text-zinc-400">Ready to Render</p>
)}

{loading && (
<p>Generating...</p>
)}

{image && (
<img
src={image}
className="max-h-[600px] rounded-2xl"
/>
)}

</div>

<button
onClick={downloadImage}
className="px-6 py-2 bg-zinc-200 rounded-full"
>

Save Image

</button>

</div>

</div>

</div>

)

}