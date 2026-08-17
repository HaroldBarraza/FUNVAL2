import express from 'express'
import type { Request, Response } from 'express'

const app  = express()
const PORT = 3000


app.get('/api/estatus', (req:Request, res:Response) => {
    res.json({estado: "Servidor en Linea", version: "1.0.0"})

})

app.get('/', (req:Request, res:Response) =>{
    res.send(`el servidor esta corriendo`)
})

app.get('/hola', (req:Request, res:Response) =>{
    res.send(`Hola mundo`)
})

app.listen(PORT, () => {
    console.log(`el servido esta corriendo en puerto http://localhost:${PORT}`);
})











