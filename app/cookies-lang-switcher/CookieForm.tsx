'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createCookie } from './actions';

type Props = {
  langCookieValue: string;
};

export default function CookieForm(props: Props) {
  const [language, setLanguage] = useState(props.langCookieValue);

  // // Alternative: Handler function moved to separate variable
  // function handleChange(event: ChangeEvent<HTMLSelectElement>) {
  //   setLanguage(event.currentTarget.value);
  // }

  return (
    <form>
      <div>
        This select will not update, because of a{' '}
        <Link href="https://github.com/facebook/react/issues/30580">
          bug in React
        </Link>
        <select
          value={language}
          // // Alternative: Handler function moved to separate variable
          // onChange={handleChange}
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
