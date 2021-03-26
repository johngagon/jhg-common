const Money = require('dinero.js');                   
const cc = require('currency-codes');                 
const cryptocurrencies = require('cryptocurrencies'); 
const Joi = require('joi');
const convert = require('joi-to-json');

//Crypto 
const _cryptos = () => {
  return cryptocurrencies.symbols();
};
const _btc = () => {
  return cryptocurrencies.BTC;
};
const _validCrypto = (code) => {
  return cryptocurrencies.symbols().includes(code);
};

//Currency 
const _codes = () => cc.codes();

const _code = (code) => cc.code(code);

const validCurrency = (code) => cc.codes().includes(code);


const schema = Joi.object({
  amount: Joi.number().integer().required(),
  currency: Joi.string().required().valid(...cc.codes())
});

const validate = (currencyInfo) => {
  const result = schema.validate(currencyInfo, {abortEarly: false});
  return Object.freeze(result);
};


const Currency = (currencyInfo = {}) => {
  const result = validate(currencyInfo);
  try {
    if(result.error) {
      return result;
    } else {
      result.value.money = Money(result.value);
      return result;
    }
  } catch (error) {
    return Object.freeze({
      error: {
        details: [error.message],
      },
      value: {
        amount: '',
        value: ''
      }
    });
  }
};

const currency = function(amount, _currency) {
  return Currency({amount, currency: _currency});
};


const jsonSchema = () => {
  return convert(schema);
};

const generateRandom = (value) => {
  const million = 1000000;
  const codes = cc.codes();
  const randomValue = value || Math.floor(Math.random() * Math.floor(million));

  const randomIndex = Math.floor(Math.random() * Math.floor(codes.length));
  const randomCode = codes[randomIndex];
  const randomCurrency = currency(randomValue, randomCode);
  return randomCurrency;
};

const labels = {
  amount: 'Amount',
  currency: 'Currency'
};



module.exports = {
  create: currency,
  Currency,
  generateRandom,
  jsonSchema,
  labels,
  validCurrency,
  _codes
};
