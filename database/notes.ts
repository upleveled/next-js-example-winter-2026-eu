// Secure database query functions below, with
// verification of session token

import { cache } from 'react';
import type { Session } from '../migrations/00007-createTableSessions';
import type { Note } from '../migrations/00008-createTableNotes';
import { sql } from './connect';

export const getNotes = cache(async (sessionToken: Session['token']) => {
  const notes = await sql<Note[]>`
    SELECT
      notes.*
    FROM
      notes
      -- You don't need to join on this, because
      -- the notes table already has user_id
      -- INNER JOIN users ON (notes.user_id = users.id)
      INNER JOIN sessions ON (
        notes.user_id = sessions.user_id
        AND sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
      )
  `;

  return notes;
});

export const getNote = cache(
  async (sessionToken: Session['token'], id: Note['id']) => {
    const [note] = await sql<Note[]>`
      SELECT
        notes.*
      FROM
        notes
        INNER JOIN sessions ON (
          notes.user_id = sessions.user_id
          AND sessions.token = ${sessionToken}
          AND sessions.expiry_timestamp > now()
        )
      WHERE
        notes.id = ${id}
    `;

    return note;
  },
);

export const getNoteExists = cache(
  async (sessionToken: Session['token'], id: Note['id']) => {
    const [record] = await sql<{ exists: boolean }[]>`
      SELECT
        EXISTS (
          SELECT
            1
          FROM
            notes
          WHERE
            notes.id = ${id}
        )
      WHERE
        EXISTS (
          SELECT
            1
          FROM
            sessions
          WHERE
            sessions.token = ${sessionToken}
            AND sessions.expiry_timestamp > now()
        )
    `;

    return Boolean(record?.exists);
  },
);

export const createNote = cache(
  async (
    sessionToken: Session['token'],
    newNote: Pick<Note, 'title' | 'textContent'>,
  ) => {
    const [note] = await sql<Note[]>`
      INSERT INTO
        notes (title, text_content, user_id)
      SELECT
        ${newNote.title},
        ${newNote.textContent},
        -- Security: derive user_id from session token instead
        -- of allowing user to choose which user_id they
        -- assign the note to
        sessions.user_id
      FROM
        sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
      RETURNING
        notes.*
    `;

    return note;
  },
);

// Insecure database query functions below, without
// verification of session token
