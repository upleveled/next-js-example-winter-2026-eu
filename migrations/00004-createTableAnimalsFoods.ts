import type { Sql } from 'postgres';

export type AnimalsFood = {
  id: number;
  animalId: number;
  foodId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE animals_foods (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      animal_id integer NOT NULL REFERENCES animals (id) ON DELETE CASCADE,
      food_id integer NOT NULL REFERENCES foods (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE animals_foods`;
}
