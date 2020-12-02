"use strict";

const {
  handleGetRates,
  handleConvertRate,
  handleStoreRateExchange,
  handleGetRateExchange,
} = require("../handlers/fixer-connector.handler");

module.exports = {
  name: "ApiRoutes",
  register: async (server) => {
    server.route([
      {
        method: "GET",
        path: "/rates",
        handler: handleGetRates,
      },
      {
        method: "GET",
        path: "/rates-list",
        handler: handleGetRates,
      },
      {
        method: "POST",
        path: "/create-rate",
        handler: handleGetRates,
      },
      {
        method: "POST",
        path: "/convert",
        handler: handleConvertRate,
      },
      {
        method: "POST",
        path: "/storeRateExchange",
        handler: handleStoreRateExchange,
      },
      {
        method: "GET",
        path: "/getRateExchange",
        handler: handleGetRateExchange,
      },
      {
        method: "PUT",
        path: "/usuarios/{id}",
        handler: async (req, res) => {
          const newUser = {
            nombre: req.payload.nombre,
            apellido: req.payload.apellido,
          };
          return res
            .response({
              datos: newUser,
              mensaje: `Usuario ID: ${req.params.id} modificado exitósamente!`,
            })
            .type("application/json");
        },
      },
      {
        method: "DELETE",
        path: "/usuarios/{id}",
        handler: async (req, res) => {
          return res
            .response({
              mensaje: `Usuario ID: ${req.params.id} eliminado exitósamente!`,
            })
            .type("application/json");
        },
      },
    ]);
  },
};
