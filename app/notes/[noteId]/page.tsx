import Link from 'next/link';
import { forbidden, notFound } from 'next/navigation';
import { getNote, getNoteExists } from '../../../database/notes';
import { getCookie } from '../../../util/cookies';

export async function generateMetadata(props: PageProps<'/notes/[noteId]'>) {
  const sessionToken = await getCookie('sessionToken');

  if (!sessionToken) {
    return {
      title: 'Note not found',
    };
  }

  const params = await props.params;
  const note = await getNote(sessionToken, Number(params.noteId));

  if (!note) {
    return {
      title: 'Note not found',
    };
  }

  return {
    title: note.title,
    description: `Private note "${note.title}"`,
  };
}

export default async function NotePage(props: PageProps<'/notes/[noteId]'>) {
  // Note authorization steps in page

  // 1. Check if the sessionToken cookie exists
  const sessionToken = await getCookie('sessionToken');

  // 2. Check if the note exists
  const noteId = Number((await props.params).noteId);
  if (sessionToken && !(await getNoteExists(sessionToken, noteId))) {
    notFound();
  }

  // 3. Query the notes with the session token and noteId
  const note = !!sessionToken && (await getNote(sessionToken, noteId));

  // 4. If there is no note for the current user, show restricted access message
  if (!note) {
    forbidden();
  }

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.textContent}</p>
      <Link href="/notes">Back to notes</Link>
    </div>
  );
}
