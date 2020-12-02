"use strict";
const db = server.plugins["hapi-mongoose"].connection; // Get the current connection for this server instance
const mongoose = server.plugins["hapi-mongoose"].lib;
// var mongoose = require("mongoose");

exports.find = (req, modelo, populateParams) => {
  var Modelo = mongoose.model(modelo);
  var promise;

  if (req.params.hasOwnProperty("id")) {
    promise = new Promise(function (resolve, reject) {
      Modelo.findById(req.params.id, function (err, encontrado) {
        if (err) {
          reject(err);
        } else {
          resolve(encontrado);
        }
      }).populate(populateParams);
    });
  } else {
    promise = new Promise(function (resolve, reject) {
      Modelo.find(null, function (err, encontrados) {
        if (err) {
          reject(err);
        } else {
          resolve(encontrados);
        }
      });
    });
  }

  return promise;
};

exports.create = (req, modelo) => {
  var Modelo = mongoose.model(modelo);

  var query = {};
  Object.keys(req.body).forEach(function (key) {
    query[key] = req.body[key];
  });
  var nuevoModelo = new Modelo(query);

  var promise = new Promise(function (resolve, reject) {
    nuevoModelo.save(query, function (err, modeloGuardado) {
      if (err) {
        reject(err);
      } else {
        resolve(modeloGuardado);
      }
    });
  });
  return promise;
};

exports.update = (req, modelo) => {
  var Modelo = mongoose.model(modelo);
  var query = {};
  Object.keys(req.body).forEach(function (key) {
    console.log(key, req.body[key]);
    query[key] = req.body[key];
  });
  console.log(query);
  var promise = new Promise(function (resolve, reject) {
    Modelo.findOneAndUpdate(
      { _id: req.params.id },
      query,
      function (err, modeloActualizado) {
        if (err) {
          reject(err);
        } else {
          resolve(modeloActualizado);
        }
      }
    );
  });

  return promise;
};

exports.remove = (req, modelo) => {
  var Modelo = mongoose.model(modelo);
  var promise = new Promise(function (resolve, reject) {
    Modelo.findById(req.query.id).remove(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Borrado");
      }
    });
  });

  return promise;
};
