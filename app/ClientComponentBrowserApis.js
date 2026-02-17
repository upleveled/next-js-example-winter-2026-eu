'use client';

import { useEffect, useState } from 'react';

export default function ClientComponentBrowserApis() {
  const [title, setTitle] = useState('');

  // If you need to access `window`, `document`, etc.
  // use `useEffect`, because it runs only in browser
  useEffect(() => {
    console.log(document.title);
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
