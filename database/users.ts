import { cache } from 'react';
import type { User } from '../migrations/00006-createTableUsers';
import { sql } from './connect';

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
  async (username: User['username'], passwordHash: string) => {
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
