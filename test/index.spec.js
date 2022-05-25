/* eslint-env jest */
const { convertToAbsolute } = require('../index');

describe('convertToAbsolute', () => {
  const pathTest1 = 'LIM017-social-network\\src';
  const pathTest2 = 'C:\\Users\\chris\\OneDrive\\Escritorio\\LIM17-md-links\\LIM017-social-networksrc';
  it('Debería convertir una ruta relativa en absoluta', () => {
    expect(convertToAbsolute(pathTest1)).toBe(pathTest2);
  });
});

describe('initial', () => {
  test('first tests', () => {
    expect(true).toBe(true);
  });
});
