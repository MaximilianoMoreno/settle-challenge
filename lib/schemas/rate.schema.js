"use strict";

const Schema = require("mongoose").Schema;

const rateValue = new Schema({
  currency: String,
  value: Number,
});

exports.fxRate = new Schema({
  date: { type: Date, default: Date.now },
  rates: [{ type: rateValue }],
});

exports.fxRateExchange = new Schema({
  amount: Number,
  pair: {
    from: String,
    to: String,
  },
  originalRate: Number,
  fee: Number,
  feeAmount: Number,
  totalAmount: Number,
});
