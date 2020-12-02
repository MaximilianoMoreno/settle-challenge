"use strict";

const Wreck = require("@hapi/wreck");
const {
  saveFxRate,
  getLastFxRate,
  saveFxRateExhange,
  getFxRateExhange,
} = require("./db-utils.service");
const { ONE_HOUR } = require("../const/util-const");

const latestRatesURI = "http://data.fixer.io/api/latest";
let ratesMap = new Map();

const mapRates = async (request, ratesResponse) => {
  ratesMap.set(ratesResponse.base, 1);
  const ratesObject = ratesResponse.rates;

  Object.keys(ratesObject).map((rateKey) => {
    ratesMap.set(rateKey, ratesObject[rateKey]);
  });

  await saveFxRate(request, ratesMap);

  console.log("RATES: ______", ratesMap);
};

const isStoredfxRatesValid = (storedfxRates) => {
  return new Date() - storedfxRates.date > ONE_HOUR;
};

const getConvertionRate = async (from, to) => {
  return ratesMap.get(from) / ratesMap.get(to);
};

const getRates = async (request) => {
  let storedfxRates = await getLastFxRate(request);

  if (!isStoredfxRatesValid(storedfxRates)) {
    const { res, payload } = await Wreck.get(
      `${latestRatesURI}?access_key=${process.env.API_ACCESS_KEY}`
    );
    const ratesResponse = JSON.parse(payload.toString());

    await mapRates(request, ratesResponse);
    return ratesResponse;
  }

  return storedfxRates;
};

exports.fetchRates = async (request) => {
  return getRates(request);
};

exports.convertRates = async (request, convertionData) => {
  await getRates(request);

  const convertionRate = await getConvertionRate(
    convertionData.from,
    convertionData.to
  );

  console.log("conversion Rate", convertionRate);

  return convertionRate * convertionData.amount;
};

exports.storeRatesExchange = async (request, rateExhangeData) => {
  await getRates(request);

  const originalRate = await getConvertionRate(
    rateExhangeData.pair.from,
    rateExhangeData.pair.to
  );

  const feeAmount =
    (originalRate * rateExhangeData.amount * rateExhangeData.fee) / 100;

  const totalAmount = originalRate * rateExhangeData.amount + feeAmount;

  const dataToStore = {
    ...rateExhangeData,
    originalRate,
    feeAmount,
    totalAmount,
  };

  console.log("dataToStore", dataToStore);

  saveFxRateExhange(request, dataToStore);
};

exports.getRateExchange = async (req) => {
  return getFxRateExhange(req);
};

exports.getCurrencyRate = (currencyKey) => {
  return ratesMap.get(currencyKey);
};

exports.getRates = () => {
  return ratesMap;
};
