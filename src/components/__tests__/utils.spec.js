import { sort, filter } from '../utils.js';

const arr = [
  { name: 'Charlie' },
  { name: 'Alice' },
  { name: 'Bob' },
];

describe('utils.js', () => {
  describe('sort', () => {
    it('sorts array ascending by key', () => {
      const result = sort([...arr], 'name', 'asc');
      expect(result.map(x => x.name)).toEqual(['Charlie', 'Bob', 'Alice']);
    });

    it('sorts array descending by key', () => {
      const result = sort([...arr], 'name', 'desc');
      expect(result.map(x => x.name)).toEqual(['Alice', 'Bob', 'Charlie']);
    });
  });

  describe('filter', () => {
    it('filters array by key and term (case-insensitive)', () => {
      expect(filter(arr, 'name', 'ali')).toEqual([{ name: 'Alice' }]);
      expect(filter(arr, 'name', 'BO')).toEqual([{ name: 'Bob' }]);
    });

    it('returns original array if term is empty', () => {
      expect(filter(arr, 'name', '')).toEqual(arr);
      expect(filter(arr, 'name', null)).toEqual(arr);
    });

    it('returns empty array if no match', () => {
      expect(filter(arr, 'name', 'zzz')).toEqual([]);
    });
  });
});
