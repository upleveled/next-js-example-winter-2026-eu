import { describe, expect, test } from '@jest/globals';
import { formatDate, getDaysUntilNextBirthDay } from '../dates';

describe('formatDate', () => {
  test("throws an error if you don't pass valid date", () => {
    // @ts-expect-error Test for invalid parameter types
    expect(() => formatDate(2)).toThrow();
    // @ts-expect-error Test for invalid parameter types
    expect(() => formatDate(true)).toThrow();
  });

  test('formats date to string', () => {
    // console.log(formatDate(new Date('2020-01-02')));
    expect(formatDate(new Date('2020-01-02'))).toBe('02/01/2020');
    expect(formatDate(new Date('2020-01-02'), 'nl-NL')).toBe('02-01-2020');
    expect(formatDate(new Date('2020-01-02'), 'de-AT')).toBe('02.01.2020');

    const dates = [
      {
        actual: formatDate(new Date('2020-01-02'), 'nl-NL'),
        expected: '02-01-2020',
      },
      {
        actual: formatDate(new Date('2020-01-02'), 'de-AT'),
        expected: '02.01.2020',
      },
    ];

    for (const date of dates) {
      expect(date.actual).toBe(date.expected);
    }
  });
});

describe('getDaysUntilNextBirthDay', () => {
  test('returns the number of days until the next birthday', () => {
    expect(
      getDaysUntilNextBirthDay(
        new Date('2024-01-10T12:00:00.000Z'),
        new Date('2000-01-15T00:00:00.000Z'),
      ),
    ).toBe(5);
  });
});
