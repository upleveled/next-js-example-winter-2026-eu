import type { Sql } from 'postgres';
import z from 'zod';
import type { User } from './00006-createTableUsers';

export const noteSchema = z.object({
  note: z.object({
    // Security: Do not include id, because it cannot be chosen by the user
    title: z
      .string()
      .min(1, 'Title must be minimum 1 character')
      .max(100, 'Title must be maximum 100 characters'),
    textContent: z
      .string()
      .min(1, 'Text content must be minimum 1 character')
      .max(10000, 'Text content must be maximum 10000 characters'),
    // Security: Do not include user_id, because it cannot be chosen by the user
  }),
});

export type Note = {
  id: number;
  title: string;
  textContent: string;
  userId: User['id'];
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE notes (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      title varchar(100) NOT NULL UNIQUE,
      text_content text NOT NULL,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql: Sql) {}
