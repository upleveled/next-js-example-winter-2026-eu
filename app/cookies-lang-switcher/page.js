import { cookies } from 'next/headers';
import CookieForm from './CookieForm';

export const metadata = {
  title: 'Cookies - Language Switcher',
  description: 'Demo of using cookies in Next.js with a language switcher',
};

export default async function CookiesLangSwitcherPage() {
  const greetings = {
    '': 'Choose your language',
    en: 'Welcome',
    nl: 'Welkom',
  };

  // Read cookies on server
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const langCookieValue = cookieStore.get('lang')?.value || '';

  return (
    <div>
      <h1>Greeting: {greetings[langCookieValue]}</h1>
      <h2>All Cookies</h2>
      {JSON.stringify(allCookies)}
      <h2>lang cookie value</h2>
      <div>{langCookieValue}</div>
      <CookieForm
        // Pass cookie value in to Client Component
        langCookieValue={langCookieValue}
      />
    </div>
  );
}
