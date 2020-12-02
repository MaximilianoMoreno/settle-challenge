"use strict";

const {
  fetchRates,
  convertRates,
  storeRatesExchange,
  getRateExchange,
} = require("../services/rates.service");

exports.handleGetRates = async (req, res) => {
  return await fetchRates(req);
};

exports.handleConvertRate = async (req, res) => {
  const { from, to, amount } = req.payload;

  const converted = await convertRates(req, { from, to, amount });

  return res.response(converted).type("application/json");
};

exports.handleStoreRateExchange = async (req, res) => {
  const { amount, pair, fee } = req.payload;

  const converted = await storeRatesExchange(req, { amount, pair, fee });

  return res.response(converted).type("application/json");
};

exports.handleGetRateExchange = async (req, res) => {
  return await getRateExchange(req);
};
