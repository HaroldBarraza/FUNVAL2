import express from "express";
import estudiantesRouter from "./routes/estudiantes.routes"
import type { Request, Response } from "express";
import swaggerUi from "swagger-ui-express"
import fs from "node:fs"
import path from "node:path";

const app = express();
const PORT = 3000;

app.use(express.json())
const swaggerFilePath = path.resolve("./swagger_output.json")
if(fs.existsSync(swaggerFilePath)){
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, "utf-8"))
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}else{
  console.log("archivo de swagger no fue encontrado :(")
}

app.use("/api/estudiantes", estudiantesRouter)


app.listen(PORT, () => {
  console.log(`el servido esta corriendo en puerto http://localhost:${PORT}`);
});
