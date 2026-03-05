import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

type Book = {
  id: number;
  title: string;
};

// Fake database (in-memory)
const books: Book[] = [
  { id: 1, title: 'The Great Gatsby' },
  { id: 2, title: 'To Kill a Mockingbird' },
];

export type BooksResponseBodyGet = {
  books: Book[];
};

// GET (Read in CRUD)
export function GET(): NextResponse<BooksResponseBodyGet> {
  return NextResponse.json({ books: books });
}

export type BooksResponseBodyPost =
  | {
      book: Book;
    }
  | {
      error: string;
    };

const bookSchema = z.object({
  title: z.string().trim().min(1).max(40),
});

// POST (Create in CRUD)
export async function POST(
  request: NextRequest,
): Promise<NextResponse<BooksResponseBodyPost>> {
  // Unsafe data from user input
  const requestBody = await request.json();

  // 1. Validate the data
  const result = bookSchema.safeParse(requestBody);

  // 2. Return error if not valid
  if (!result.success) {
    // Useful for debugging Zod errors
    console.log(result.error.issues);

    return NextResponse.json(
      {
        error: 'Pass an object with a title string property',
      },
      { status: 400 },
    );
  }

  const newBook = {
    id: books.length + 1,
    // 3. Use the validated data
    title: result.data.title,
  };

  books.push(newBook);

  return NextResponse.json(
    { book: newBook },
    {
      // HTTP status code 201: Book was created successfully
      status: 201,
    },
  );
}
