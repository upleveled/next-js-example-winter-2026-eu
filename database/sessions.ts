import { cache } from 'react';
import type { Session } from '../migrations/00007-createTableSessions';
import { sql } from './connect';

// Secure database query functions below, with
// verification of session token

export const getValidSession = cache(async (sessionToken: Session['token']) => {
  const [session] = await sql<Session[]>`
    SELECT
      sessions.*
    FROM
      sessions
    WHERE
      -- Session token matches
      sessions.token = ${sessionToken}
      -- Session expiry timestamp in future (not yet expired)
      AND sessions.expiry_timestamp > now()
  `;

  return session;
});

// Insecure database query functions below, without
// verification of session token

export const createSessionInsecure = cache(
  async (token: string, userId: number) => {
    const [session] = await sql<Session[]>`
      INSERT INTO
        sessions (token, user_id)
      VALUES
        (
          ${token},
          ${userId}
        )
      RETURNING
        sessions.*
    `;

    // Clean up table: Delete sessions that are expired
    await sql`
      DELETE FROM sessions
      WHERE
        sessions.expiry_timestamp < now()
    `;

    return session;
  },
);

export const deleteSession = cache(async (sessionToken: Session['token']) => {
  const [session] = await sql<Session[]>`
    DELETE FROM sessions
    WHERE
      token = ${sessionToken}
    RETURNING
      sessions.*
  `;

  return session;
});
