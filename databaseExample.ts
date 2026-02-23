import { config } from 'dotenv-safe';
import postgres from 'postgres';
import { cache } from 'react';
import type { Animal } from './migrations/00000-createTableAnimals';

// Adds all environment variables inside
// .env file to `process.env`
config();

// Postgres.js will read from `process.env`
const sql = postgres();

// const sql = postgres(
//   // Connect to database using connection string
//   //
//   // This can be an antipattern, because it will expose
//   // your credentials
//   'postgres://next_js_example_winter_2026_eu:next_js_example_winter_2026_eu@localhost:5432/next_js_example_winter_2026_eu',
// );

// const animals = await sql`
//   SELECT * FROM animals;
// `;

// console.log(animals);

// // "Create" in CRUD
// // createAnimalInsecure(animal)
// export const createAnimalInsecure = cache(
//   async (
//     // Omit = Ban .id property from animal
//     newAnimal: Omit<Animal, 'id'>,
//   ) => {
//     const [animal] = await sql<Animal[]>`
//       INSERT INTO
//         animals (
//           first_name,
//           type,
//           accessory,
//           birth_date
//         )
//       VALUES
//         (
//           ${newAnimal.firstName},
//           ${newAnimal.type},
//           ${newAnimal.accessory},
//           ${newAnimal.birthDate}
//         )
//       RETURNING
//         *
//     `;
//     return animal;
//   },
// );

// const createdAnimal = await createAnimalInsecure({
//   // id: 10, // will be type error
//   firstName: 'animal from js',
//   type: 'Goat',
//   accessory: 'gold chain',
//   birthDate: new Date('2020-01-01'),
// });

// console.log(createdAnimal)

// // "Update" in CRUD
// // updateAnimalInsecure(updatedAnimal)
// export const updateAnimalInsecure = cache(async (updatedAnimal: Animal) => {
//   const [animal] = await sql<Animal[]>`
//     UPDATE animals
//     SET
//       first_name = ${updatedAnimal.firstName},
//       type = ${updatedAnimal.type},
//       accessory = ${updatedAnimal.accessory},
//       birth_date = ${updatedAnimal.birthDate}
//     WHERE
//       id = ${updatedAnimal.id}
//     RETURNING
//       animals.*
//   `;
//   return animal;
// });

// const updatedAnimal = await updateAnimalInsecure({
//   id: 6,
//   firstName: 'Ralph25',
//   type: 'Penguin2',
//   accessory: 'Watch3',
//   birthDate: new Date('2005-08-24'),
// });

// console.log(updatedAnimal);

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

const deletedAnimal = await deleteAnimalInsecure({
  id: 8,
});

console.log(deletedAnimal);
