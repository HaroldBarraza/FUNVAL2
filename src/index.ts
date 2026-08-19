import express from "express";
import estudiantesRouter from "./routes/estudiantes.routes"
import type { Request, Response } from "express";


const app = express();
const PORT = 3000;

app.use(express.json())

/* app.get("/", (req: Request, res:Response) => {
  console.log("hola miucno")
  res.status(400).json({error: "el servidor esta corrietnod"})
}) */

app.use("/api/estudiantes", estudiantesRouter)


app.listen(PORT, () => {
  console.log(`el servido esta corriendo en puerto http://localhost:${PORT}`);
});
