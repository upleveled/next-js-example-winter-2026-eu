import Link from 'next/link';
import { getUser } from '../database/users';
import { getCookie } from '../util/cookies';
import LogoutButton from './(auth)/logout/LogoutButton';
import styles from './Header.module.scss';
import RouterRefreshButton from './RouterRefreshButton';

export default async function Header() {
  // 1. Get session token from cookie
  const sessionToken = await getCookie('sessionToken');
  const user = !!sessionToken && (await getUser(sessionToken));

  return (
    <header className={styles.header}>
      <div>
        <Link href="/">Homepage</Link>
        <Link href="/animals">Animals</Link>
        <Link href="/fruits">Fruits</Link>
        <Link href="/about">About</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/cookies-lang-switcher">Switch Language</Link>
      </div>
      <div>
        {user ? (
          <>
            <Link href={`/profile/${user.username}`}>{user.username}</Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
        <Link href="/animals/dashboard">Dashboard</Link>
        {/* eslint-disable-next-line react-hooks/purity */}
        <div>{Math.round(Math.random() * 100)}</div>
        <RouterRefreshButton />
      </div>
    </header>
  );
}
