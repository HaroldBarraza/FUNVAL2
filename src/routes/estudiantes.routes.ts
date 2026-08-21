import { Router } from 'express'
import type { Request, Response } from "express";
import  type{  Estudiante, crearestudiante, actualizar_estudiante, filtrar_estudiantes} from "../types/estudiantes"
import { estudiantes, setLista } from '../data/estudiantedb';
const router:Router = Router()


let idincrement = 1;


router.get("/", (req: Request<{}, {}, {},filtrar_estudiantes >, res: Response) => {
/* #swagger.tags = ['Estudiantes']
 #swagger.summary = 'obtiene la lista de todos los estudiantes'
    
   #swagger.parameters['bootcamp'] = {in: 'query', 
  description: 'filtra por bootcamp(es indiferente a minusculas y mayusculas)', 
  type:'string'
  }
   */
  const {bootcamp} = req.query;
  let respaldo_lista = [...estudiantes]
  if(bootcamp){
    respaldo_lista = respaldo_lista.filter((estado) => estado.bootcamp.toLowerCase() === bootcamp.toLowerCase())
  }
  return res.status(201).json(respaldo_lista)
});


router.get("/:id", (req:Request, res: Response) => {
  /*#swagger.tags = ['Estudiantes']
  #swagger.summary = 'obtiene solo un estudiante segun la ID'
  #swagger.parameters['id'] = {
  in: 'path',
  description: "ID estudiante",
  required: true,
  type: "integer"
  }
 */
  const id_estudiante = Number(req.params.id)
  if(!id_estudiante){
    return res.status(400).json({error: "ingrese un id valido"})
  }
    const estudiante_econtrado = estudiantes.find((id) => {
    return id.id === id_estudiante
  })
  if(!estudiante_econtrado){
    return res.status(404).json({error:"no existe ese estudiane"})
  }

  return res.json(estudiante_econtrado)

})


router.post("/", (req: Request<{}, {}, crearestudiante>, res: Response) => {
  const { name, email, bootcamp } = req.body;
/*#swagger.tags = ['Estudiantes']
#swagger.summary = 'crear un nuevo estudiante'
 #swagger.parameters['body'] = {
in: 'body',
description: 'Datos para crear un nuevo estudiante',
required: true,
schema: {
name: 'Julio',
email: 'example@example.com',
bootcamp: 'Programacion'
}
}
   */
  if (!email) {
    return res.status(400).json({ error: "el campo email no puede estar vacio" });
  }
  
  let nameLimpio = name;
  if (name === 'undefined' || name === 'null' || !name) {
    nameLimpio = 'Sin name';
  } else {
    nameLimpio = name.trim() || 'Sin name';
  }
  
  const nuevo_estudiante: Estudiante = {
    id: idincrement++,
    name: name,
    email: email,
    bootcamp: bootcamp
  };
  
  estudiantes.push(nuevo_estudiante);
  return res.status(201).json(nuevo_estudiante);
});

router.put("/:id", (req:Request, res: Response) =>{
/* #swagger.tags = ['Estudiantes']
#swagger.summary = 'Actualiza la informacion de un estudiante'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID del estudiante que se quiere actualizar',
      required: true,
      type: 'integer'
    } 
#swagger.parameters['body'] = {
in: 'body',
description: 'Datos que desea actulizar',
required: true,
schema: {
name: 'Julio',
email: 'example@example.com',
bootcamp: 'Programacion'
}
}
*/
  const id_estudiante = Number(req.params.id)
  if(isNaN(id_estudiante)){
    return res.status(400).json({error : "el id tiene que ser un numero"})
  }
  const encontrarlo = estudiantes.findIndex((e) => {return e.id === id_estudiante})
  if(encontrarlo === -1){
    return res.status(404).json({error:"el alumno no exite"})
  }else{
    const {name, email, bootcamp}: actualizar_estudiante = req.body
    estudiantes[encontrarlo] = {
      id: id_estudiante,
      name: name ?? estudiantes[encontrarlo]?.name,
      email:email ?? estudiantes[encontrarlo]?.email,
      bootcamp: bootcamp ?? estudiantes[encontrarlo]?.bootcamp,
    }
    res.json(estudiantes[encontrarlo])
  }
})

router.delete("/:id" ,(req:Request, res:Response) => {
/* 
#swagger.tags = ['Estudiantes']
#swagger.summary = 'Eliminar a un estudiante por ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID del estudiante que se quiere eliminar',
      required: true,
      type: 'integer'
    } */
  const id_estudiante = Number(req.params.id)
  const encontrado = estudiantes.findIndex((id) => {return id.id === id_estudiante})
  if(encontrado === -1){
    return res.status(404).json({error: "estudiante no fue encontrado"})
  }else{
    let nuevalista = estudiantes.filter((id) => {
      return id.id !== id_estudiante
    })
    setLista(nuevalista)
    return res.status(200).json({mesaje:"se elimino al alumno con exito"})
  }
})


export default router