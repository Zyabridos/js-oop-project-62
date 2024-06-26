import { Validator } from '../src/string.js';
// import { Validator } from '../src/number.js';

describe('test string', () => {
  const v = new Validator();
  const schema = v.string();

  const standartCases = [['', true], [null, true], [undefined, true]];
  const requieredCases = [['what does the fox say', true], ['hexlet', true], [null, false], ['', false]];
  const containsCases = [['what', 'what does the fox say', true], ['whatthe', 'what does the fox say', false]];

  test.each(standartCases) ('standart definding of .string() returns true no matter what',
   (argument, expected) => {

    const actual = schema.isValid(argument);
    expect(actual).toEqual(expected)
  });

  test.each(requieredCases) ('required() test',
   (argument, expected) => {

    schema.required();

    const actual = schema.isValid(argument);
    expect(actual).toEqual(expected)
  });

    test.each(containsCases) ('contains() test',
   (argument, value, expected) => {
    const actual = schema.contains(argument).isValid(value);
    expect(actual).toEqual(expected);
    // should be false since we already added contains('whatthe') in the past test
    expect(schema.isValid('what does the fox say')).toBeFalsy;
  });

  test('minLength', () => {
    schema.minLength(10).minLength(4).isValid('Hexlet') // true
    expect(schema.minLength(10).minLength(4).isValid('Hexlet')).toBeTruthy
  })
});

describe('test number', () => {
  const v = new Validator();
  const schema = v.number();

  const standartCases = [[8, true], [null, true], ['string', false], [{}, false]];
  const requieredCases = [[7, true], [null, false]];

  test.each(standartCases) ('standart definding of .number() returns true only with numbers (including null)',
   (argument, expected) => {

    const actual = schema.isValid(argument);
    expect(actual).toEqual(expected)
  });

  test.each(requieredCases) ('required() test',
   (argument, expected) => {
    schema.required();

    const actual = schema.isValid(argument);
    expect(actual).toEqual(expected)
  });

  test('positive() cases', () => {
    expect(schema.positive().isValid(42).toBeTruthy);
    expect(schema.positive().isValid(-666).toBeFalsy);
  });

  test('range() cases', () => {
    schema.range(-5, 5);

    expect(schema.isValid(-42).toBeFalsy);
    expect(schema.isValid(2).toBeTruthy);
  })
})

describe('test arrays', () => {
  const v = new Validator();
  const schema = v.array();
  const requieredCases = [[null, false], [[], true], [['hexlet'], true]]

  test.each(requieredCases) ('required() test',
   (argument, expected) => {
    schema.required();

    const actual = schema.isValid(argument);
    expect(actual).toEqual(expected)
  });

  test('sizeOf() test', () => {
    schema.sizeof(2);
    
    schema.isValid(['hexlet']).toBeFalsy;
    schema.isValid(['hexlet', 'code-basics']).toBeTruthy;
  })
});
