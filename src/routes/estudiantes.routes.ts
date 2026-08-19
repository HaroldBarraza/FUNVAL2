import { Router } from 'express'
import type { Request, Response } from "express";
import  type{  Estudiante, crearestudiante, actualizar_estudiante, filtrar_estudiantes} from "../types/estudiantes"
import { estudiantes, setLista } from '../data/estudiantedb';
const router:Router = Router()


let idincrement = 1;


router.get("/", (req: Request<{}, {}, {},filtrar_estudiantes >, res: Response) => {
  const {bootcamp} = req.query;
  let respaldo_lista = [...estudiantes]
  if(bootcamp){
    respaldo_lista = respaldo_lista.filter((estado) => estado.bootcamp.toLowerCase() === bootcamp.toLowerCase())
  }else{
    return res.json({error: "el bootcamp no es valido"})
  }
  return res.json({datos: respaldo_lista})
});


router.get("/:id", (req:Request, res: Response) => {
  const id_estudiante = Number(req.params.id)
  if(!id_estudiante){
    return res.status(400).json({error: "ingrese un id valido"})
  }
  if(id_estudiante < 0 && id_estudiante > estudiantes.length){
    return res.status(404).json({error:"no existe ese estudiane"})
  }
  const estudiante_econtrado = estudiantes.find((id) => {
    return id.id === id_estudiante
  })
  return res.json(estudiante_econtrado)

})

router.post("/", (req: Request<{}, {}, crearestudiante>, res: Response) => {
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

router.put("/:id", (req:Request, res: Response) =>{
  const id_estudiante = Number(req.params.id)
  const encontrarlo = estudiantes.findIndex((e) => {return e.id === id_estudiante})
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

router.delete("/:id" ,(req:Request, res:Response) => {
  const id_estudiante = Number(req.params.id)
  const encontrado = estudiantes.findIndex((id) => {return id.id === id_estudiante})
  if(encontrado === -1){
    res.status(404).json({error: "estudiante no fue encontrado"})
  }else{
    let nuevalista = estudiantes.filter((id) => {
      return id.id !== id_estudiante
    })
    setLista(nuevalista)
    res.status(200).json({mesaje:"se elimino al alumno con exito"})
  }
})


export default router