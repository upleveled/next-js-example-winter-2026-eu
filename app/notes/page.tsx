import { redirect } from 'next/navigation';
import { getNotes } from '../../database/notes';
import { getUser } from '../../database/users';
import { getCookie } from '../../util/cookies';
import NotesForm from './NotesForm';

export const metadata = {
  title: 'Notes',
  description: 'Save your private notes',
};

export default async function NotesPage() {
  // Notes authorization steps in page
  // 1. Get session token from cookie
  const sessionToken = await getCookie('sessionToken');
  if (!sessionToken) {
    redirect('/login?returnTo=/notes');
  }

  // 2. Check if session token is valid with getUser()
  const [user, notes] = await Promise.all([
    getUser(sessionToken),
    getNotes(sessionToken),
  ]);

  // 3. If sessionToken is invalid (no user), redirect to login page
  if (!user) {
    redirect('/login?returnTo=/notes');
  }

  return <NotesForm user={user} notes={notes} />;
}
