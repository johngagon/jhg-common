
const Joi = require('joi');
const convert = require('joi-to-json');
const faker = require('faker');
const random = require('../random');

const titleRegex = /^[a-z\d\-_\s]+$/i;
const schema = Joi.string().regex(titleRegex).required();

const validate = (_title) => {
  const result = schema.validate(_title);
  return Object.freeze(result);
}

const jsonSchema = () => {
  return convert(schema);
};

const labels = {
  title: 'Title'
};

const Title = (someString) => {

  try { 
    return validate(someString);
  } catch (err) {
    return {
      error: {details:[err]},
      value: ''
    }
  }
}

const generateRandom = () => {
  const verbs = ['Tend','Visit','Supervise','Scrub', 'Fix', 'Request', 'File documents for', 'Inspect'];
  const nouns = ['Dog', 'Car', 'Taxes', 'House', 'Air Conditioner'];
  const accomplices = ['Frank', 'Susan', 'Doctor Jones', 'Ms. Jenkins', 'Joe', 'Mary', 'Tim', 'Anne'];
  const verb = random.element(verbs);
  const noun = random.element(nouns);
  const accomplice = random.element(accomplices);
  return `${verb} the ${noun} with ${accomplice}`;
}

module.exports = {
  Title,
  generateRandom,
  labels,
  jsonSchema,
  schema
}
