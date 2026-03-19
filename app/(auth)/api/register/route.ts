import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createSessionInsecure } from '../../../../database/sessions';
import {
  createUserInsecure,
  getUserInsecure,
} from '../../../../database/users';
import {
  type User,
  userSchemaRegister,
} from '../../../../migrations/00006-createTableUsers';
import { secureCookieOptions } from '../../../../util/cookies';
import { getCombinedErrorMessage } from '../../../../util/validation';

export type RegisterResponseBodyPost =
  | {
      user: User;
    }
  | {
      error: string;
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBodyPost>> {
  // User registration steps in Route Handler
  // 1. Get user data from request
  const requestBody = await request.json();
  console.log(requestBody);

  // 2. Validate user data with Zod
  const result = userSchemaRegister.safeParse(requestBody);

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

  // 3. Check if user already exists in `users` table
  if (await getUserInsecure(result.data.user.username)) {
    return NextResponse.json(
      {
        error: 'Username already exists',
      },
      {
        status: 400,
      },
    );
  }

  // 4. Hash plain text password from user
  const passwordHash = await bcrypt.hash(result.data.user.password, 12);
  console.log(passwordHash);

  // 5. Insert user with hashed password into `users` table
  const user = await createUserInsecure(
    result.data.user.username,
    passwordHash,
  );

  if (!user) {
    return NextResponse.json(
      {
        error: 'Creating user failed',
      },
      {
        status: 500,
      },
    );
  }

  // 5. Generate session token
  const sessionToken = crypto.randomBytes(100).toString('base64');
  console.log(sessionToken);

  // 6. Insert session into `sessions` table
  const session = await createSessionInsecure(sessionToken, user.id);

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
    user: user,
  });
}
