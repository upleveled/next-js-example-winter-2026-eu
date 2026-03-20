import { NextResponse } from 'next/server';
import { createNote } from '../../../database/notes';
import {
  type Note,
  noteSchema,
} from '../../../migrations/00008-createTableNotes';
import { getCookie } from '../../../util/cookies';
import { getCombinedErrorMessage } from '../../../util/validation';

export type CreateNoteResponseBodyPost =
  | {
      note: Note;
    }
  | {
      error: string;
    };

export async function POST(
  request: Request,
): Promise<NextResponse<CreateNoteResponseBodyPost>> {
  // Note creation steps in Route Handler

  // 1. Get note request body
  const requestBody = await request.json();

  // 2. Validate request body with Zod
  const result = noteSchema.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      {
        error: getCombinedErrorMessage(result.error.issues),
      },
      {
        status: 400,
      },
    );
  }

  // 3. Get session token from cookie
  const sessionToken = await getCookie('sessionToken');

  // 4. Create note
  const newNote =
    sessionToken &&
    (await createNote(sessionToken, {
      title: result.data.note.title,
      textContent: result.data.note.textContent,
    }));

  // 5. Return error if note creation fails
  if (!newNote) {
    return NextResponse.json(
      { error: 'Note not created or access denied creating note' },
      {
        status: 400,
      },
    );
  }

  // 6. Return created note
  return NextResponse.json({
    note: newNote,
  });
}
