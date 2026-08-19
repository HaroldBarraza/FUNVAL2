interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

interface crearestudiante{
  nombre: string;
  email: string;
  bootcamp: string
}

interface actualizar_estudiante{
  nombre: string,
  email: string,
  bootcamp: string,
}
interface filtrar_estudiantes{
    nombre: string,
    email: string,
    bootcamp: string
}


export type{
    Estudiante,
    crearestudiante,
    actualizar_estudiante,
    filtrar_estudiantes
}