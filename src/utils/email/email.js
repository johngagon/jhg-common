const Joi = require('joi');
const convert = require('joi-to-json');
const faker = require('faker');

const schema = Joi.string().email({ tlds: {allow: false} }).required();

const validate = (_email) => {
  const result = schema.validate(_email);
  return Object.freeze(result);
};

const jsonSchema = () => {
  return convert(schema);
};

const labels = {
  email: 'Email'
};

const Email = (someString) => {
  try { 
    return validate(someString);
  } catch (err) {
    return {
      error: {details:[err]},
      value: ''
    }
  }
};

const generateRandom = () => {
  return faker.internet.email();
};

module.exports = {
  Email,
  generateRandom,
  labels,
  jsonSchema
};
