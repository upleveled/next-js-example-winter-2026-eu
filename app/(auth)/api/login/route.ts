import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createSessionInsecure } from '../../../../database/sessions';
import { getUserWithPasswordHashInsecure } from '../../../../database/users';
import {
  type User,
  userSchemaLogin,
} from '../../../../migrations/00006-createTableUsers';
import { secureCookieOptions } from '../../../../util/cookies';
import { getCombinedErrorMessage } from '../../../../util/validation';

export type LoginResponseBodyPost =
  | {
      user: User;
    }
  | {
      error: string;
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LoginResponseBodyPost>> {
  // User login steps in Route Handler

  // 1. Get user data from request
  const requestBody = await request.json();

  // 2. Validate user data with Zod
  const result = userSchemaLogin.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      {
        error: getCombinedErrorMessage(result.error.issues),
      },
      {
        status: 400,
      },
    );
  }

  // 3. Get user with password hash
  const userWithPasswordHash = await getUserWithPasswordHashInsecure(
    result.data.user.username,
  );

  if (!userWithPasswordHash) {
    return NextResponse.json(
      {
        error: 'Username or password invalid',
      },
      {
        status: 401,
      },
    );
  }

  // 4. Verify entered password against stored password_hash
  const isPasswordValid = await bcrypt.compare(
    result.data.user.password,
    userWithPasswordHash.passwordHash,
  );

  // Security: reset password hash to empty string to avoid
  // accidental access
  userWithPasswordHash.passwordHash = '';

  if (!isPasswordValid) {
    return NextResponse.json(
      {
        error: 'Username or password invalid',
      },
      {
        status: 401,
      },
    );
  }

  // 5. Generate session token
  const sessionToken = crypto.randomBytes(100).toString('base64');

  // 6. Insert session into `sessions` table
  const session = await createSessionInsecure(
    sessionToken,
    userWithPasswordHash.id,
  );

  if (!session) {
    return NextResponse.json(
      {
        error: 'Session creation failed',
      },
      {
        status: 500,
      },
    );
  }

  // 7. Create secure cookie via response header
  (await cookies()).set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  return NextResponse.json({
    user: {
      id: userWithPasswordHash.id,
      username: userWithPasswordHash.username,
    },
  });
}
