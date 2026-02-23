import type { Sql } from 'postgres';

const foods = [
  { id: 1, name: 'Broccoli', type: 'Vegetable' },
  { id: 2, name: 'Strawberry', type: 'Fruit' },
  { id: 3, name: 'Salmon', type: 'Protein' },
  { id: 4, name: 'Oats', type: 'Grain' },
  { id: 5, name: 'Yogurt', type: 'Dairy' },
  { id: 6, name: 'Lentils', type: 'Legume' },
  { id: 7, name: 'Almonds', type: 'Nut' },
  { id: 8, name: 'Potato', type: 'Vegetable' },
  { id: 9, name: 'Pineapple', type: 'Fruit' },
];

export async function up(sql: Sql) {
  for (const food of foods) {
    await sql`
      INSERT INTO
        foods (name, type)
      VALUES
        (
          ${food.name},
          ${food.type}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const food of foods) {
    await sql`
      DELETE FROM foods
      WHERE
        id = ${food.id}
    `;
  }
}
