interface Estudiante {
  id: number;
  name: string;
  email: string;
  bootcamp: string;
}

interface crearestudiante{
  name: string;
  email: string;
  bootcamp: string
}

interface actualizar_estudiante{
  name: string,
  email: string,
  bootcamp: string,
}
interface filtrar_estudiantes{
    name: string,
    email: string,
    bootcamp: string
}


export type{
    Estudiante,
    crearestudiante,
    actualizar_estudiante,
    filtrar_estudiantes
}