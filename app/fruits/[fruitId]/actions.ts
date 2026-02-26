'use server';

import { cookies } from 'next/headers';
import type { Fruit } from '../../../database/fruits';
import { getCookie } from '../../../util/cookies';
import { parseJson } from '../../../util/json';

export type FruitComment = {
  id: number;
  fruitId: Fruit['id'];
  comment: string;
};

export async function updateComment(
  fruitId: Fruit['id'],
  comment: string,
  // comment: FruitComment['comment'],
) {
  const fruitCommentsCookieValue = await getCookie('fruitComments');

  // 1. Parse the cookie value
  const fruitComments: FruitComment[] =
    // If cookie value is undefined, use empty array
    (parseJson(fruitCommentsCookieValue) as FruitComment[] | undefined) || [];

  // 2. Find the matching fruitComment
  const existingFruitComment = fruitComments.find((fruitComment) => {
    return fruitComment.fruitId === fruitId;
  });

  if (existingFruitComment) {
    // 3. Update the existing comment
    existingFruitComment.comment = comment;
  } else {
    // 4. If no existing comment, add a new comment
    fruitComments.push({
      id: fruitComments.length + 1,
      fruitId: fruitId,
      comment: comment,
    });
  }

  // 5. Stringify the fruitComments JS value
  const newCookieValue = JSON.stringify(fruitComments);

  // 6. Set the cookie
  (await cookies()).set('fruitComments', newCookieValue);
}
