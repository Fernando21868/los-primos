import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Los Primos API",
    description: "API of Los Primos",
  },
  host: "localhost:8080",
  schemes: ["http"],
};

const outputFile = "./losPrimos.json";
const endpointFiles = ["./src/routes/users.route.ts","./src/routes/products.route.ts"];


swaggerAutogen(outputFile, endpointFiles, doc);
