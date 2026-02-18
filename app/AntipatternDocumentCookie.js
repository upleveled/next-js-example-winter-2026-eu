'use client';

import { useEffect, useState } from 'react';

// DO NOT USE - ANTIPATTERN
export default function AntipatternDocumentCookie() {
  const [language, setLanguage] = useState('');

  useEffect(() => {
    console.log('document.cookie', document.cookie);

    const langCookieValue = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('lang='))
      ?.split('=')[1];

    console.log('langCookieValue', langCookieValue);
    setLanguage(langCookieValue);
  }, []);

  return (
    <select
      value={language}
      onChange={(event) => {
        setLanguage(event.currentTarget.value);
        document.cookie = `lang=${event.currentTarget.value}`;
      }}
    >
      <option value="">Choose your language</option>
      <option value="en">English</option>
      <option value="nl">Nederlands</option>
    </select>
  );
}
