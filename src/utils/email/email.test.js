
import {
  Email,
  generateRandom,
  labels,
  jsonSchema
} from './email';

describe('email', () => {
  
  describe('#Email', () => {
    it('errs on undefined', ()=>{
      const invalid = undefined;
      const invalidEmail = Email(invalid);

      expect(invalidEmail.error.details[0].message).toMatch(/required/);
    });    
    it('errs on null', ()=>{
      const invalid = null;
      const invalidEmail = Email(invalid);

      expect(invalidEmail.error.details[0].message).toMatch(/must be a string/);
    });   
    it('errs on empty', ()=>{
      const invalid = '';
      const invalidEmail = Email(invalid);

      expect(invalidEmail.error.details[0].message).toMatch(/is not allowed to be empty/);
    });  
    it('errs on bad format', ()=>{
      const invalid = 'joe@';
      const invalidEmail = Email(invalid);

      expect(invalidEmail.error.details[0].message).toMatch(/must be a valid email/);
    });           
    it('handles valid', ()=>{
      const valid = 'joe.schmo@gmail.com';
      const validatedEmail = Email(valid);
      console.log(validatedEmail);
      expect(validatedEmail.value).toEqual(valid);
    });
  });

  describe('#generateRandom', () => {
    it('handles valid', ()=>{
      const randomEmail = generateRandom();
      console.log(randomEmail);
    });

  });
  describe('#labels', () => {
    it('has labels', ()=>{
      console.log(labels);
    });
  });
  describe('#jsonSchema', () => {
    it('has schema', ()=>{
      console.log(jsonSchema());
    });
  });      
});
