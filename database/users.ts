import { cache } from 'react';
import type { User } from '../migrations/00006-createTableUsers';
import type { Session } from '../migrations/00007-createTableSessions';
import { sql } from './connect';

// Secure database query functions below, with
// verification of session token

export const getUser = cache(async (sessionToken: Session['token']) => {
  const [user] = await sql<User[]>`
    SELECT
      users.id,
      users.username
    FROM
      users
      INNER JOIN sessions ON (
        -- Session token matches
        sessions.token = ${sessionToken}
        -- Session expiry timestamp in future (not yet expired)
        AND sessions.expiry_timestamp > now()
        -- Connect session with user
        AND users.id = sessions.user_id
      )
  `;

  return user;
});

// Insecure database query functions below, without
// verification of session token

export const getUserInsecure = cache(async (username: User['username']) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      username = ${username.toLowerCase()}
  `;

  return user;
});

type UserWithPasswordHash = User & {
  passwordHash: string;
};

export const getUserWithPasswordHashInsecure = cache(
  async (username: User['username']) => {
    const [user] = await sql<UserWithPasswordHash[]>`
      SELECT
        id,
        username,
        password_hash
      FROM
        users
      WHERE
        username = ${username.toLowerCase()}
    `;

    return user;
  },
);

export const createUserInsecure = cache(
  async (
    username: User['username'],
    passwordHash: UserWithPasswordHash['passwordHash'],
  ) => {
    const [user] = await sql<User[]>`
      INSERT INTO
        users (username, password_hash)
      VALUES
        (
          ${username.toLowerCase()},
          ${passwordHash}
        )
      RETURNING
        id,
        username
    `;
    return user;
  },
);
