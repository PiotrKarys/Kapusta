const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Kapu$ta API",
      version: "1.0.0",
      description: "API documentation for Kapu$ta application",
    },
    servers: [
      {
        url: " http://localhost:3001", // lokalny
        // url: "https://kapusta-eta.vercel.app/", // vercel
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
