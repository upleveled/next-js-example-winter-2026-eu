// Simulate a real database by importing
// the "poison pill" from 'server-only'
//
// This will cause any Client Component
// importing this file to break
import 'server-only';
import { cache } from 'react';
import type { Animal } from '../migrations/00000-createTableAnimals';
import { sql } from './connect';

// const animals = [
//   {
//     id: 1,
//     firstName: 'Dennis',
//     type: 'goat',
//     accessory: 'expired library card',
//     birthDate: new Date('2015-04-09'),
//   },
//   {
//     id: 2,
//     firstName: 'Monica',
//     type: 'owl',
//     accessory: 'laser pointer',
//     birthDate: new Date('2018-11-02'),
//   },
//   {
//     id: 3,
//     firstName: 'Trevor',
//     type: 'iguana',
//     accessory: 'plastic fork collection',
//     birthDate: new Date('2020-08-17'),
//   },
//   {
//     id: 4,
//     firstName: 'Sharon',
//     type: 'seal',
//     accessory: 'mysterious key labeled "DO NOT"',
//     birthDate: new Date('2016-01-26'),
//   },
//   {
//     id: 5,
//     firstName: 'Paul',
//     type: 'pigeon',
//     accessory: 'tiny briefcase full of bread receipts',
//     birthDate: new Date('2019-07-13'),
//   },
// ];

// export function getAnimals() {
//   return animals;
// }

// export function getAnimal(id) {
//   return animals.find((animal) => animal.id === id);
// }

// We use the cache() function below to
// run the function only 1 time per request

// "Read" in CRUD
export const getAnimalsInsecure = cache(async () => {
  const animals = await sql<Animal[]>`
    SELECT
      *
    FROM
      animals
  `;
  return animals;
});

export const getAnimalInsecure = cache(async (animalId: number) => {
  const [animal] = await sql<Animal[]>`
    SELECT
      *
    FROM
      animals
    WHERE
      id = ${animalId}
  `;
  return animal;
});

type AnimalWithFoods = Animal & {
  foodId: number | null;
  foodName: string | null;
};

export const getAnimalsWithFoodsInsecure = cache(async (animalId: number) => {
  const animalWithFoods = await sql<AnimalWithFoods[]>`
    SELECT
      animals.id,
      animals.first_name,
      animals.type,
      animals.accessory,
      animals.birth_date,
      foods.id AS food_id,
      foods.name AS food_name
    FROM
      animals
      LEFT JOIN animals_foods ON animals.id = animals_foods.animal_id
      LEFT JOIN foods ON animals_foods.food_id = foods.id
    WHERE
      animals.id = ${animalId}
  `;
  return animalWithFoods;
});

type AnimalWithFoodsJsonAgg = Animal & {
  foods: {
    id: number | null;
    name: string | null;
    type: string | null;
  }[];
};

export const getAnimalsWithFoodsJsonAggInsecure = cache(
  async (animalId: number) => {
    const [animal] = await sql<AnimalWithFoodsJsonAgg[]>`
      SELECT
        animals.id,
        animals.first_name,
        animals.type,
        animals.accessory,
        animals.birth_date,
        -- Return empty array instead of [null] if no food is found
        coalesce(
          json_agg(foods.*) FILTER (
            WHERE
              foods.id IS NOT NULL
          ),
          '[]'
        ) AS foods
      FROM
        animals
        LEFT JOIN animals_foods ON animals.id = animals_foods.animal_id
        LEFT JOIN foods ON animals_foods.food_id = foods.id
      WHERE
        animals.id = ${animalId}
      GROUP BY
        animals.id
    `;
    return animal;
  },
);

// "Create" in CRUD
// createAnimalInsecure(animal)
export const createAnimalInsecure = cache(
  async (
    // Omit = Ban .id property from animal
    newAnimal: Omit<Animal, 'id'>,
  ) => {
    const [animal] = await sql<Animal[]>`
      INSERT INTO
        animals (
          first_name,
          type,
          accessory,
          birth_date
        )
      VALUES
        (
          ${newAnimal.firstName},
          ${newAnimal.type},
          ${newAnimal.accessory},
          ${newAnimal.birthDate}
        )
      RETURNING
        animals.*
    `;
    // console.log(animal);
    return animal;
  },
);

// "Update" in CRUD
// updateAnimalInsecure(updatedAnimal)
export const updateAnimalInsecure = cache(async (updatedAnimal: Animal) => {
  const [animal] = await sql<Animal[]>`
    UPDATE animals
    SET
      first_name = ${updatedAnimal.firstName},
      type = ${updatedAnimal.type},
      accessory = ${updatedAnimal.accessory},
      birth_date = ${updatedAnimal.birthDate}
    WHERE
      id = ${updatedAnimal.id}
    RETURNING
      animals.*
  `;
  return animal;
});

// "Delete" in CRUD
// deleteAnimalInsecure(animalToDelete)
export const deleteAnimalInsecure = cache(
  async (animalToDelete: Pick<Animal, 'id'>) => {
    const [animal] = await sql<Animal[]>`
      DELETE FROM animals
      WHERE
        id = ${animalToDelete.id}
      RETURNING
        animals.*
    `;
    return animal;
  },
);
