
import {
  Title,
  generateRandom,
  labels,
  jsonSchema
} from './title';

describe('title', () => {
  
  describe('#Title', () => {
    it('errs on empty', ()=>{
      const invalid = '';
      const invalidTitle = Title(invalid);
      
      expect(invalidTitle.error.details[0].message).toMatch(/is not allowed to be empty/);
    });  
    it('errs on bad format', ()=>{
      const invalid = 'Joe 123!';
      const invalidTitle = Title(invalid);

      expect(invalidTitle.error.details[0].message).toMatch(/fails to match the required pattern/);
    });           
    it('handles valid', ()=>{
      const valid = 'Do Something Important';
      const validatedTitle = Title(valid);

      expect(validatedTitle.value).toEqual(valid);
    });
  });

  describe('#generateRandom', () => {
    it('handles valid', ()=>{
      const randomTitle = generateRandom();
      console.log(randomTitle);
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
