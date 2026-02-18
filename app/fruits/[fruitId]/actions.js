'use server';

import { cookies } from 'next/headers';
import { getCookie } from '../../../util/cookies';
import { parseJson } from '../../../util/json';

export async function updateComment(fruitId, commentValue) {
  const fruitCommentsCookieValue = await getCookie('fruitComments');

  // 1. Parse the cookie value
  const fruitComments =
    // If cookie value is undefined, use empty array
    parseJson(fruitCommentsCookieValue) || [];

  // 2. Find the matching fruitComment
  const existingFruitComment = fruitComments.find((comment) => {
    return comment.fruitId === fruitId;
  });

  if (existingFruitComment) {
    // 3. Update the existing comment
    existingFruitComment.comment = commentValue;
  } else {
    // 4. If no existing comment, add a new comment
    fruitComments.push({
      id: fruitComments.length + 1,
      fruitId: fruitId,
      comment: commentValue,
    });
  }

  // 5. Stringify the fruitComments JS value
  const newCookieValue = JSON.stringify(fruitComments);

  // 6. Set the cookie
  (await cookies()).set('fruitComments', newCookieValue);
}
