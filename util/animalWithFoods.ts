import { notFound } from 'next/navigation';
import type { AnimalWithFoods } from '../database/animals';

export function collapseAnimalWithFoods(animalWithFoods: AnimalWithFoods[]) {
  const animal = animalWithFoods[0] as
    | (AnimalWithFoods & {
        foods: {
          id: number | null;
          name: string | null;
        }[];
      })
    | undefined;

  if (animalWithFoods.length < 1 || !animal) {
    // Throws an error
    notFound();
  }

  animal.foods = animalWithFoods
    .map(({ foodId, foodName }) => {
      // Return null if food info not present
      if (!foodId) return null;
      return {
        id: foodId,
        name: foodName,
      };
    })
    // Remove any array items that don't contain food information
    .filter((food) => food !== null);

  return animal;
}
