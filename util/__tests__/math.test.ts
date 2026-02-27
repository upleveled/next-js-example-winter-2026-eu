import { describe, expect, test } from '@jest/globals';
import { add, multiply } from '../math';

// test('one to be one', () => { expect(10 - 9).toBe(1); });

describe('add function', () => {
  test('adds two numbers', () => {
    expect(add(5, 5)).toBe(10);
    expect(add(7, 7)).toBe(14);
  });

  test('throws an error if arguments are not numbers', () => {
    // @ts-expect-error Test for invalid parameter types
    expect(() => add(5, true)).toThrow();
    // @ts-expect-error Test for invalid parameter types
    expect(() => add('5', '4')).toThrow();
  });

  // it('adds two numbers', () => {
  //   expect(add(5, 5)).toBe(10);
  //   expect(add(7, 7)).toBe(14);
  // });
});

describe('multiply function', () => {
  test('multiplies two numbers', () => {
    expect(multiply(4, 5)).toBe(20);
    expect(multiply(100, 5)).toBe(500);
  });

  test('throws an error if arguments are not numbers', () => {
    // @ts-expect-error Test for invalid parameter types
    expect(() => multiply(5, true)).toThrow();
    // @ts-expect-error Test for invalid parameter types
    expect(() => multiply('5', '4')).toThrow();
  });
});
