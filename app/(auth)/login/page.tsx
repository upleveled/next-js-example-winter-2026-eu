import { redirect } from 'next/navigation';
import { getValidSession } from '../../../database/sessions';
import { getCookie } from '../../../util/cookies';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Login',
  description: 'Login for Widgets Anonymous',
};

export default async function LoginPage(props: PageProps<'/login'>) {
  // Logged in user redirect steps in page
  // 1. Get session token from cookie
  const sessionToken = await getCookie('sessionToken');

  // 2. Check if session token is valid
  const session = !!sessionToken && (await getValidSession(sessionToken));

  // 3. If session token is valid, redirect to homepage
  if (session) {
    redirect('/');
  }

  const searchParams = await props.searchParams;
  const returnTo = searchParams.returnTo;
  console.log(returnTo);

  return <LoginForm returnTo={returnTo} />;
}
