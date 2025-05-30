import { sort, filter } from '../utils.js';

const arr = [
  { name: 'C' },
  { name: 'A' },
  { name: 'B' },
];

describe('utils.js', () => {
  describe('sort', () => {
    it('sorts array ascending by key', () => {
      const result = sort([...arr], 'name', 'asc');
      expect(result.map(x => x.name)).toEqual(['C', 'B', 'A']);
    });

    it('sorts array descending by key', () => {
      const result = sort([...arr], 'name', 'desc');
      expect(result.map(x => x.name)).toEqual(['A', 'B', 'C']);
    });
  });

  describe('filter', () => {
    it('filters array by key and term (case-insensitive)', () => {
      expect(filter(arr, 'name', 'a')).toEqual([{ name: 'A' }]);
      expect(filter(arr, 'name', 'B')).toEqual([{ name: 'B' }]);
    });

    it('returns original array if term is empty', () => {
      expect(filter(arr, 'name', '')).toEqual(arr);
      expect(filter(arr, 'name', null)).toEqual(arr);
    });

    it('returns empty array if no match', () => {
      expect(filter(arr, 'name', 'm')).toEqual([]);
    });
  });
});
