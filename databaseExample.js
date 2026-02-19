import { config } from 'dotenv-safe';
import postgres from 'postgres';

// Adds all environment variables inside
// .env file to `process.env`
config({ example: '.env.example', allowEmptyValues: false });

// Postgres.js will read from `process.env`
const sql = postgres();

// const sql = postgres(
//   // Connect to database using connection string
//   //
//   // This can be an antipattern, because it will expose
//   // your credentials
//   'postgres://next_js_example_winter_2026_eu:next_js_example_winter_2026_eu@localhost:5432/next_js_example_winter_2026_eu',
// );

const animals = await sql`
  SELECT * FROM animals;
`;

console.log(animals);
