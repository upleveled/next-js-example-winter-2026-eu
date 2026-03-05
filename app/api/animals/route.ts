import { NextRequest, NextResponse } from 'next/server';
import {
  createAnimalInsecure,
  getAnimalsInsecure,
} from '../../../database/animals';
import {
  type Animal,
  animalSchema,
} from '../../../migrations/00000-createTableAnimals';

export type AnimalsResponseBodyGet = {
  animals: Animal[];
};

// ‼️ WARNING: `GET` Route Handler is often not needed - instead query database via Server Component
//
// GET (Read in CRUD)
export async function GET(): Promise<NextResponse<AnimalsResponseBodyGet>> {
  const animals = await getAnimalsInsecure();
  return NextResponse.json({ animals: animals });
}
export type AnimalsResponseBodyPost =
  | {
      animal: Animal;
    }
  | {
      error: string;
    };

// POST (Create in CRUD)
export async function POST(
  request: NextRequest,
): Promise<NextResponse<AnimalsResponseBodyPost>> {
  // Unsafe data from user input
  const requestBody = await request.json();

  // 1. Validate the data
  const result = animalSchema.safeParse(requestBody);

  // 2. Return error if not valid
  if (!result.success) {
    // Useful for debugging Zod errors
    console.log(result.error.issues);

    return NextResponse.json(
      {
        error: 'Pass an object with an animal property',
      },
      { status: 400 },
    );
  }

  // 3. Use the validated data
  const newAnimal = await createAnimalInsecure(result.data.animal);

  if (!newAnimal) {
    return NextResponse.json(
      {
        error: 'Error creating animal',
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { animal: newAnimal },
    {
      // HTTP status code 201: Animal was created successfully
      status: 201,
    },
  );
}
