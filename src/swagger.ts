
import swaggerAutogen from "swagger-autogen";
const doc = {
    info:{
        title: "API de incripciones academicas",
        decription: "Documentacion de la API REST del MP-S2",
        version: "1.0.0"
    },
    host: "localhost:3000"
};

const outPutFile = "../swagger_output.json"

const routes = ["./src/index.ts"]

swaggerAutogen()(outPutFile,routes,doc)