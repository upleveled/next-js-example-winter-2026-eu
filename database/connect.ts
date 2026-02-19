// Add the "poison pill" from 'server-only'
// to prevent using this file in a Client
// Component
import 'server-only';
import { config } from 'dotenv-safe';
import postgres, { type Sql } from 'postgres';

// Adds all environment variables inside
// .env file to `process.env`
config();

declare namespace globalThis {
  let postgresSqlClient: Sql;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  if (!('postgresSqlClient' in globalThis)) {
    globalThis.postgresSqlClient = postgres({
      transform: {
        ...postgres.camel,
        undefined: null,
      },
    });
  }

  return globalThis.postgresSqlClient;
}

export const sql = connectOneTimeToDatabase();
