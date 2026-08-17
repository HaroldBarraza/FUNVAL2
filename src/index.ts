import express from 'express'
import type { Request, Response } from 'express'
import fs, { readFile } from "fs";
import path from "path";

const app  = express()
const PORT = 3000


app.get('/api/estatus', (req:Request, res:Response) => {
    res.json({estado: "Servidor en Linea", version: "1.0.0"})

})

app.listen(PORT, () => {
    console.log(`el servido esta corriendo en puerto http://localhost:${PORT}`);
})











