const replaceVars = require('./index');

test('check invalid input', () => {
    expect(() => replaceVars(undefined, {})).toThrow('Non-string input given');
});

test('check invalid variables', () => {
    expect(() => replaceVars('', '')).toThrow('Variable configuration is not an object');
});

test('replace single variable', () => {
    expect(replaceVars('{input}', { input: 'hello' })).toBe('hello');
});

test('replace multiple instances of variable', () => {
    expect(replaceVars('he{letter}{letter}o', { letter: 'l' })).toBe('hello');
});

test('replace multiple different variables', () => {
    expect(replaceVars('{one}{two}', { one: 'hel', two: 'lo' })).toBe('hello');
});

test('ignore unspecified variables', () => {
    expect(replaceVars('{one} {two}', { one: 'hello' })).toBe('hello {two}');
});

test('ignore additional variables', () => {
    expect(replaceVars('hello there', { general: 'Kenobi!' })).toBe('hello there');
});

