import { NextResponse } from 'next/server';

type RootResponseBodyGet = {
  animals: string;
  books: string;
};

export function GET(): NextResponse<RootResponseBodyGet> {
  return NextResponse.json({
    animals: '/api/animals',
    books: '/api/books',
  });
}
