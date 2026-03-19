import type { Sql } from 'postgres';
import type { User } from './00006-createTableUsers';

export type Session = {
  id: number;
  token: string;
  expiryTimestamp: Date;
  userId: User['id'];
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE sessions (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      token varchar(150) NOT NULL UNIQUE,
      expiry_timestamp timestamptz NOT NULL DEFAULT now() + interval '24 hours',
      -- ON DELETE CASCADE: delete all sessions when user is deleted
      user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE sessions `;
}
