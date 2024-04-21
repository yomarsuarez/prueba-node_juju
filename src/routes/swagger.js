const swaggerJsdoc = require("swagger-jsdoc");

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Mi API",
//       version: "1.0.0",
//       description: "Documentación de mi API con Swagger",
//     },
//   },
//   apis: ["../routes/*.js"],
// };

// const specs = swaggerJsdoc(options);

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Gestión de Libros API",
      version: "1.0.0",
      description: "Documentación de la API para gestionar libros",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de desarrollo",
      },
    ],
  },
  apis: ["./routes.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
