import Link from 'next/link';
import { fruits } from '../../database/fruits';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';

export const metadata = {
  title: 'Fruits',
  description: 'We also sell fruits',
};

export default async function FruitsPage() {
  const fruitCommentsCookieValue = await getCookie('fruitComments');

  const fruitComments = parseJson(fruitCommentsCookieValue) || []; // If cookie value is undefined, use empty array

  return (
    <div>
      <h1>Fruits</h1>
      {fruits.map((fruit) => {
        return (
          <div key={`fruit-${fruit.id}`}>
            <div>
              <Link href={`/fruits/${fruit.id}`}>
                {fruit.emoji} {fruit.name}
              </Link>
            </div>
            {
              fruitComments.find(
                (fruitComment) => fruitComment.fruitId === fruit.id,
              )?.comment
            }
          </div>
        );
      })}
    </div>
  );
}
