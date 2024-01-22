import modifiers from './modifiers';

it('should output the block name and given modifier classes prefixed with the given block name', () => {
  const actualResult = modifiers('button', 'primary');
  const expectedResult = 'button button--primary';

  expect(expectedResult).toBe(actualResult);
});

it('should output only the block name when modifier classes are omitted', () => {
  const actualResult = modifiers('button');
  const expectedResult = 'button';

  expect(expectedResult).toBe(actualResult);
});
