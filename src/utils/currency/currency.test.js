const random = require('../random/random');

const {
  create:currency,
  generateRandom,
  validCurrency,
  _codes,
  jsonSchema,
  labels
} = require('./currency');

const amountError = '"amount" must be a number';
const amountIntError = '"amount" must be an integer';
const currencyError = /"currency" must be one of/;

const message = (result, num) => result?.error?.details[num]?.message;

describe('currency', () => {

  describe('#Currency', () => {
    it('errs with bad amount and currency', ()=>{
      const candidate = currency('xyz','xyz');

      expect(message(candidate,0)).toEqual(amountError);
      expect(message(candidate,1)).toMatch(currencyError);
    });
    it('errs with null amount and currency', ()=>{
      const candidate = currency(null,  null);

      expect(message(candidate,0)).toEqual(amountError);
      expect(message(candidate,1)).toMatch(currencyError);
    });
    it('errs with empty amount and valid currency', ()=>{
      const candidate = currency({},  'USD');

      expect(message(candidate,0)).toEqual(amountError);
    });
    it('errs with decimal amount and valid currency', ()=>{
      const candidate = currency(15.02,  'USD');

      expect(message(candidate,0)).toEqual(amountIntError);
    });

    it('creates valid USD', ()=>{      
      const candidate = currency(1500,'USD').value;

      expect(candidate.amount).toEqual(1500);
      expect(candidate.currency).toEqual('USD');
      expect(candidate.money.toFormat()).toEqual('$15.00');
    });
    it('creates valid Euro', ()=>{      
      const candidate = currency(1500,'EUR').value;

      expect(candidate.amount).toEqual(1500);
      expect(candidate.currency).toEqual('EUR');
      expect(candidate.money.toFormat()).toEqual('€15.00');
    });
    
    it('works for all currencies', () => {

      const currencies = _codes();
      let currValue;
      currencies.forEach((curr) => {
        currValue = currency(1500, curr).value._resultValue;

      });
      
    });
    
  });

  describe('#generateRandom', () => {
    it('can generate valid random currency', () => {
      const randomCurrency = generateRandom();
      console.log(randomCurrency);
      expect(randomCurrency.error).toBeUndefined();
    });
  });

  describe('#validCurrency', () => {
    it('can validate currency codes correctly', () => {
      expect(validCurrency('USD')).toEqual(true);
      expect(validCurrency('XYZ')).toEqual(false);
      expect(validCurrency('BTC')).toEqual(false); 
    });
  });
  describe('#jsonSchema', () => {
    it('produces a schema', () => {
      const js = jsonSchema();
      console.log(js);
    });
  });
  describe('#labels', () => {
    it('labels have value', () => {
      console.log(labels);
    });
  });

});

