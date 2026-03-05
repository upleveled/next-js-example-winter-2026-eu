import { NextRequest, NextResponse } from 'next/server';
import {
  getAnimalInsecure,
  updateAnimalInsecure,
} from '../../../../database/animals';
import { deleteAnimalInsecure } from '../../../../databaseExample';
import {
  type Animal,
  animalSchema,
} from '../../../../migrations/00000-createTableAnimals';

export type AnimalResponseBodyGet =
  | {
      animal: Animal;
    }
  | {
      error: string;
    };

// ‼️ WARNING: `GET` Route Handler is often not needed - instead query database via Server Component
//
// GET (Read in CRUD)
export async function GET(
  request: NextRequest,
  context: RouteContext<'/api/animals/[animalId]'>,
): Promise<NextResponse<AnimalResponseBodyGet>> {
  const animalId = (await context.params).animalId;
  const animal = await getAnimalInsecure(Number(animalId));

  if (!animal) {
    return NextResponse.json(
      {
        error: 'Cannot find animal',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ animal: animal });
}

export type AnimalResponseBodyPut =
  | {
      animal: Animal;
    }
  | {
      error: string;
    };

// PUT (Update in CRUD)
export async function PUT(
  request: NextRequest,
  context: RouteContext<'/api/animals/[animalId]'>,
): Promise<NextResponse<AnimalResponseBodyPut>> {
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

  // Optional: first get the animal
  const animalId = (await context.params).animalId;
  if (!(await getAnimalInsecure(Number(animalId)))) {
    return NextResponse.json(
      {
        error: 'Cannot find animal',
      },
      { status: 404 },
    );
  }

  const animal = await updateAnimalInsecure({
    id: Number(animalId),
    ...result.data.animal,
  });

  if (!animal) {
    return NextResponse.json(
      {
        error: 'Cannot update animal',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ animal: animal });
}

export type AnimalResponseBodyDelete =
  | {
      animal: Animal;
    }
  | {
      error: string;
    };

// DELETE (Delete in CRUD)
export async function DELETE(
  request: NextRequest,
  context: RouteContext<'/api/animals/[animalId]'>,
): Promise<NextResponse<AnimalResponseBodyDelete>> {
  // Optional: first get the animal
  const animalId = (await context.params).animalId;
  if (!(await getAnimalInsecure(Number(animalId)))) {
    return NextResponse.json(
      {
        error: 'Cannot find animal',
      },
      { status: 404 },
    );
  }

  const animal = await deleteAnimalInsecure({
    id: Number(animalId),
  });

  if (!animal) {
    return NextResponse.json(
      {
        error: 'Cannot delete animal',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ animal: animal });
}
