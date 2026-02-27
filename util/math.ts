export function add(a: number, b: number) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Please pass only numbers');
  }

  return a + b;
}

export function multiply(a: number, b: number) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Please pass only numbers');
  }

  return a * b;
}
