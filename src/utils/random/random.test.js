const random = require('./random');

describe('#element', () => {
  it('handles empty', () =>{
    const result = random.element([]);
    expect(result).toBeUndefined();
  });
  it('handles one', () =>{
    const result = random.element(['apple']);
    expect(result).toEqual('apple');
  });
  it('it treats anything not obj or arr as empty array', () =>{  
    const obj = 'string';
    const result = random.element(obj);
    expect(result).toBeUndefined();
  });  
  it('handles objects', () =>{  
    const obj = {APPLE: 'A', BANANA: 'B', CHERRY: 'C'};
    const result = random.element(obj);
    expect(result).toBeDefined();
  });

});