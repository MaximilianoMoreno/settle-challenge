"use strict";

// store FX rates to avoid calling API every time a request to our system is made
exports.saveFxRate = async (request, fxRates) => {
  console.log("fxRates obj", fxRates);
  const fxRate = request.server["mongoose:connector"].getModel("fxRate");
  const fxRateModel = new fxRate({ fxRate });

  console.log("fxRateModel", fxRateModel);
  fxRates.forEach((value, currency, map) => {
    fxRateModel.rates.push({ currency, value });
  });

  return fxRateModel.save();
};

// Get last stored rates
exports.getLastFxRate = async (request) => {
  const FxRateModel = request.server["mongoose:connector"].getModel("fxRate");
  return await FxRateModel.find().sort({ _id: -1 }).limit(1);
};

exports.saveFxRateExhange = async (request, fxRateExchangeData) => {
  const FxRateExchange = request.server["mongoose:connector"].getModel(
    "fxRateExchange"
  );
  const fxRateExchangeModel = new FxRateExchange(fxRateExchangeData);
  console.log("fxRateExchangeModel", fxRateExchangeModel);

  return fxRateExchangeModel.save();
};

exports.getFxRateExhange = async (request) => {
  const fxRateExchangeModel = request.server["mongoose:connector"].getModel(
    "fxRateExchange"
  );
  return await fxRateExchangeModel.find();
};
