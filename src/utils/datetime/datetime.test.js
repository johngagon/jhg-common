
import {
  DateTime,
  generateRandom,
  labels,
  jsonSchema,
  validate
} from './datetime';

const EASTERN = 'America/New_York'

describe('datetime', () => {

  describe('#DateTime', () => {
    it('can detect several bad values', () => {
      const date = '03/51/2021';
      const time = '12:96 PM';
      const timezone = 'blahblahblah'
      const result = DateTime(date,time,timezone);

      expect(result.error).toBeDefined();
      expect(result.error.details.length).toEqual(3);
    });

    it('can generate date and time from utc', ()=>{
      const expectedDate = '03/22/2021';
      const expectedTime = '12:56 PM';
      const utc = '2021-03-22T16:56:00Z';
      const result = DateTime(undefined, undefined, EASTERN,utc);
      
      expect(result.error).toBeUndefined();
      expect(result.value.date).toEqual(expectedDate);      
      expect(result.value.time).toEqual(expectedTime);      
      expect(result.value.timezone).toEqual(EASTERN);
      expect(result.value.utc).toEqual(utc);      
    });


    it('can generate valid date time with valid args', ()=>{
      const expectedUtc = '2021-03-22T16:56:00Z';
      const date = '03/22/2021';
      const time = '12:56 PM';
      const result = DateTime(date,time,EASTERN);
      
      expect(result.error).toBeUndefined();
      expect(result.value.date).toEqual(date);
      expect(result.value.time).toEqual(time);
      expect(result.value.timezone).toEqual(EASTERN);
      expect(result.value.utc).toEqual(expectedUtc);
    });

    it('can generate random', ()=>{
      const randomUtc = generateRandom();
      const result = DateTime(undefined, undefined, EASTERN, randomUtc);
      expect(result.error).toBeUndefined();
    });
    it('has labels', ()=>{
      console.log(labels());
    });    
    it('has json schema', ()=>{
      console.log(jsonSchema());
    });    
    it('can validate', ()=>{
      const date = '03/22/2021';
      const time = '12:56 PM';
      const datetime = DateTime(date,time,EASTERN).value;
      console.log('Datetime: ',datetime);
      const result = validate(datetime);
      console.log('Valid datetime result: ', result);
    });   
  });
});
