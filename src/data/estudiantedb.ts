import type { Estudiante } from "../types/estudiantes";
import fs from "node:fs/promises"
import path from "node:path";

const DB_PATH = path.resolve(__dirname, "basedatos.json")

export let estudiantes: Estudiante[] = [];

export const cargarEstudiantes = async():Promise<void> =>{
    try{
        const data = await fs.readFile(DB_PATH, 'utf-8');
        estudiantes = JSON.parse(data)
    }catch{
        await fs.writeFile(DB_PATH, JSON.stringify([], null, 2))
    }
}

export const guardarInformacion = async(): Promise<void> => {
    await fs.writeFile(DB_PATH, JSON.stringify(estudiantes, null, 2))
} 

export const agregarEstudiantes = async(est:Estudiante): Promise<void> => {
    estudiantes.push(est)
    await guardarInformacion()
}


export const setLista = async(nuevaLista: Estudiante[]):Promise<void> => {
    estudiantes = nuevaLista
    await guardarInformacion()
}
