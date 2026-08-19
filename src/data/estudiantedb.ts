import type { Estudiante } from "../types/estudiantes";

export let estudiantes: Estudiante[] = [];

export function setLista(nuevalista:Estudiante[]){
    estudiantes = nuevalista
}