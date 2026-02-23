import type { Sql } from 'postgres';

const animalsFoods = [
  // Dennis the goat likes Broccoli
  { id: 1, animalId: 1, foodId: 1 },

  // Dennis the goat likes Oats
  { id: 2, animalId: 1, foodId: 4 },

  // Monica the owl likes Salmon
  { id: 3, animalId: 2, foodId: 3 },

  // Monica the owl likes Strawberry
  { id: 4, animalId: 2, foodId: 2 },

  // Trevor the iguana likes Lentils
  { id: 5, animalId: 3, foodId: 6 },

  // Trevor the iguana likes Pineapple
  { id: 6, animalId: 3, foodId: 9 },

  // Sharon the seal likes Salmon
  { id: 7, animalId: 4, foodId: 3 },

  // Sharon the seal likes Yogurt
  { id: 8, animalId: 4, foodId: 5 },

  // Paul the pigeon likes Oats
  { id: 9, animalId: 5, foodId: 4 },

  // Paul the pigeon likes Almonds
  { id: 10, animalId: 5, foodId: 7 },
];

export async function up(sql: Sql) {
  for (const animalFood of animalsFoods) {
    await sql`
      INSERT INTO
        animals_foods (animal_id, food_id)
      VALUES
        (
          ${animalFood.animalId},
          ${animalFood.foodId}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const animalFood of animalsFoods) {
    await sql`
      DELETE FROM animals_foods
      WHERE
        id = ${animalFood.id}
    `;
  }
}
