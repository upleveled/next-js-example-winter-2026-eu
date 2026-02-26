import Link from 'next/link';
import styles from './Header.module.scss';
import RouterRefreshButton from './RouterRefreshButton';

export default function Header() {
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
        {/* eslint-disable-next-line react-hooks/purity */}
        <div>{Math.round(Math.random() * 100)}</div>
        <RouterRefreshButton />
      </div>
    </header>
  );
}
