import { describe, expect, test } from '@jest/globals';
import { collapseAnimalWithFoods } from '../animalWithFoods';

describe('collapseAnimalWithFoods', () => {
  test('throws on empty arrays', () => {
    expect(() => collapseAnimalWithFoods([])).toThrow();
  });

  test('transforms animal data', () => {
    expect(
      collapseAnimalWithFoods([
        {
          id: 5,
          firstName: 'Paul',
          type: 'pigeon',
          accessory: 'tiny briefcase full of bread receipts',
          birthDate: new Date('2019-07-13'),
          foodId: 4,
          foodName: 'Oats',
        },
        {
          id: 5,
          firstName: 'Paul',
          type: 'pigeon',
          accessory: 'tiny briefcase full of bread receipts',
          birthDate: new Date('2019-07-13'),
          foodId: 7,
          foodName: 'Almonds',
        },
      ]),
    ).toStrictEqual({
      id: 5,
      firstName: 'Paul',
      type: 'pigeon',
      accessory: 'tiny briefcase full of bread receipts',
      birthDate: new Date('2019-07-13'),
      foodId: 4,
      foodName: 'Oats',
      foods: [
        {
          id: 4,
          name: 'Oats',
        },
        {
          id: 7,
          name: 'Almonds',
        },
      ],
    });
  });
});
