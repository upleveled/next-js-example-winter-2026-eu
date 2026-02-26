'use server';

import { cookies } from 'next/headers';

export async function createCookie(value: string) {
  // Set cookie on server
  //
  // This will also refresh the state in all React components
  (await cookies()).set('lang', value);
}
