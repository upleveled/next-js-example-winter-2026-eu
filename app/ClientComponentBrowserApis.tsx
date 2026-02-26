'use client';

import { useEffect, useState } from 'react';

export default function ClientComponentBrowserApis() {
  const [title, setTitle] = useState('');

  // No longer recommended, read this:
  // - https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-effect
  //
  // If you need to access `window`, `document`, etc.
  // use `useEffect`, because it runs only in browser
  useEffect(() => {
    console.log(document.title);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTitle(document.title);
  }, []);

  return (
    <div>
      {/* This will break with the error `document is not defined` */}
      {/* <div>{document.title}</div> */}
      <div>{title}</div>
    </div>
  );
}
