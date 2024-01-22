import makeSortItemsByPriority from './makeSortItemsByPriority';
import { ItemData } from '../types';

it('should return a function', () => {
  const actualResult = makeSortItemsByPriority([]);
  const expectedResult = 'function';

  expect(typeof actualResult).toBe(expectedResult);
});

it('should return a function that sorts items by priority', () => {
  const items: ItemData[] = [
    { priority: 'medium' } as ItemData,
    { priority: 'low' } as ItemData,
    { priority: 'high' } as ItemData,
    { priority: 'medium' } as ItemData,
  ];

  const sortItemsByPriority = makeSortItemsByPriority(['low', 'medium', 'high']);
  const actualResult = items.sort(sortItemsByPriority);
  const expectedResult: ItemData[] = [
    { priority: 'high' } as ItemData,
    { priority: 'medium' } as ItemData,
    { priority: 'medium' } as ItemData,
    { priority: 'low' } as ItemData,
  ];

  expect(actualResult).toEqual(expectedResult);
});
