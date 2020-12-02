"use strict";

const Hapi = require("@hapi/hapi");
const routes = require("./routes/routes");
const Mongoose = require("hapi-nosql-mongoose");
const schemas = require("./schemas/index");

// Create a server with a host and port
const server = Hapi.server({
  host: "localhost",
  port: 8000,
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

exports.init = async () => {
  await server.initialize();
  return server;
};

exports.start = async () => {
  const options = {
    promises: "native",
    uri: `mongodb+srv://maxi:${process.env.DB_PASSWORD}@settlenetwork.qao77.mongodb.net/rates?retryWrites=true&w=majority`,
    schemas,
  };

  await server.register(routes);
  await server.start();
  await server.register({
    plugin: Mongoose,
    options,
  });

  console.log("Server running at:", server.info.uri);
  return server;
};
