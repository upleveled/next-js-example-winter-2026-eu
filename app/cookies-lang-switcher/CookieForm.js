'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createCookie } from './actions';

export default function CookieForm(props) {
  const [language, setLanguage] = useState(props.langCookieValue);

  return (
    <form>
      <div>
        This select will not update, because of a{' '}
        <Link href="https://github.com/facebook/react/issues/30580">
          bug in React
        </Link>
        <select
          value={language}
          onChange={(event) => {
            setLanguage(event.currentTarget.value);
          }}
        >
          <option value="">Choose your language</option>
          <option value="en">English</option>
          <option value="nl">Nederlands</option>
        </select>
      </div>
      <div>
        Input works fine:
        <input
          value={language}
          onChange={(event) => setLanguage(event.currentTarget.value)}
        />
      </div>
      <button
        formAction={async () => {
          // Run the Server Action to set the cookie on the server
          await createCookie(language);
        }}
      >
        Save
      </button>
    </form>
  );
}
