'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import ErrorMessage from '../../ErrorMessage';
import type { LoginResponseBodyPost } from '../api/login/route';

type Props = {
  returnTo: string | string[] | undefined;
};

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/login', {
          method: 'POST',
          // We don't need this because Next.js also reads text/plain content type
          // headers: {
          //   'Content-Type': 'application/json',
          // },
          body: JSON.stringify({
            user: {
              username: username,
              password: password,
            },
          }),
        });

        const responseBody = (await response.json()) as LoginResponseBodyPost;

        if ('error' in responseBody) {
          setErrorMessage(responseBody.error);
          return;
        }

        setErrorMessage('');

        // Redirect after login to either:
        // 1. returnTo (page user was trying to access)
        // 2. Profile page
        router.push(
          getSafeReturnToPath(props.returnTo) ||
            `/profile/${responseBody.user.username}`,
        );
      }}
    >
      <label>
        Username
        <input
          value={username}
          onChange={(event) => {
            setUsername(event.currentTarget.value);
          }}
        />
      </label>

      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
        />
      </label>

      <button>Login</button>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </form>
  );
}
