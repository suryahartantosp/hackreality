import express from "express"
import cors from "cors"
import { GoogleGenerativeAI } from "@google/generative-ai"

const app = express()

app.use(cors())
app.use(express.json())

const ai = new GoogleGenerativeAI("API_KEY_KAMU")

app.post("/generate", async (req,res)=>{

const { prompt } = req.body

try{

const model = ai.getGenerativeModel({ model:"gemini-2.0-flash" })

const result = await model.generateContent(prompt)

const text = result.response.text()

res.json({ text })

}catch(err){

res.status(500).json({ error:err.message })

}

})

app.listen(3000,()=>{
console.log("AI server running on port 3000")
})