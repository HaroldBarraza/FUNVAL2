import { error } from "console";
import express from "express";
import type { Request, Response } from "express";

const app = express();
const PORT = 3000;

let idincrement = 1;

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}


let estudiantes: Estudiante[] = [];

app.use(express.json());

app.get("/api/estatus", (req: Request, res: Response) => {
  res.json({ estado: "Servidor en Linea", version: "1.0.0" });
});

app.get("/api/estudiantes", (req: Request, res: Response) => {
  res.json(estudiantes);
});

interface crearestudiante{
  nombre: string;
  email: string;
  bootcamp: string
}

app.post("/api/estudiantes", (req: Request<{}, {}, crearestudiante>, res: Response) => {
  const {nombre, email, bootcamp} = req.body
  if(!email){
    res.status(400).json({error: "el campo email no puede estar vacio"})
  }else{
    const nuevo_estudiante: Estudiante = {
      id: idincrement++,
      nombre: nombre,
      email:email,
      bootcamp:bootcamp
    }
    estudiantes.push(nuevo_estudiante)
    res.status(201).json(nuevo_estudiante)
  }
})

interface actualizar_estudiante{
  nombre: string,
  email: string,
  bootcamp: string,
}

app.put("/api/estudiantes/:id", (req:Request, res: Response) =>{
  const id_estudiante = Number(req.params.id)
  const encontrarlo = estudiantes.findIndex((id) => {return id.id === id_estudiante})
  if(encontrarlo === -1){
    res.status(404).json({error:"el alumno no exite"})
  }else{
    const {nombre, email, bootcamp}: actualizar_estudiante = req.body
    estudiantes[encontrarlo] = {
      id: id_estudiante,
      nombre: nombre ?? estudiantes[encontrarlo]?.nombre,
      email:email ?? estudiantes[encontrarlo]?.email,
      bootcamp: bootcamp ?? estudiantes[encontrarlo]?.bootcamp,
    }
    res.json(estudiantes[encontrarlo])
  }
})

app.delete("/api/estudiantes/:id" ,(req:Request, res:Response) => {
  const id_estudiante = Number(req.params.id)
  const encontrado = estudiantes.findIndex((id) => {return id.id === id_estudiante})
  if(encontrado === -1){
    res.status(404).json({error: "estudiante no fue encontrado"})
  }else{
    estudiantes = estudiantes.filter((id) => {
      return id.id !== id_estudiante
    })
    res.status(200).json({mesaje:"se elimino al alumno con exito"})
  }
})

app.listen(PORT, () => {
  console.log(`el servido esta corriendo en puerto http://localhost:${PORT}`);
});
