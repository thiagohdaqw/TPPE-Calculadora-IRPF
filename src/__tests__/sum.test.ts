import { sum } from '../sum';

test('basic', () => {
  expect(sum(0, 0)).toBe(0);
});

test('basic again', () => {
  expect(sum(1, 2)).toBe(3);
});