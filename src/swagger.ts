import swaggerAutogen from "swagger-autogen";
const doc = {
  info: {
    title: "API de incripciones academicas",
    description: "Documentacion de la API REST del MP-S2",
    version: "1.0.0",
  },
  host: "c87k99jw-3000.brs.devtunnels.ms",
  basePath: "/",
  schemes: ["https"],
};

const outPutFile = "../swagger_output.json";

const routes = ["./src/index.ts"];

swaggerAutogen()(outPutFile, routes, doc);
