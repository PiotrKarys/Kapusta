const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Kapu$ta API",
    version: "1.0.0",
    description: "Kapu$ta to aplikacja do zarządzania finansami osobistymi.",
  },
  servers: [
    {
      url: "http://loclahost:3001",
      url: "https://kapusta-eta.vercel.app",
    },
  ],
  pahts: {},
};

module.exports = swaggerDefinition;