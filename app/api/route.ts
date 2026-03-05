import { NextResponse } from 'next/server';

type RootResponseBodyGet = {
  animals: string;
  books: string;
};

export async function GET(): Promise<NextResponse<RootResponseBodyGet>> {
  return NextResponse.json({
    animals: '/api/animals',
    books: '/api/books',
  });
}
