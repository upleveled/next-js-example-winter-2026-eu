import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { fruits } from '../../../database/fruits';
import { parseJson } from '../../../util/json';
import type { FruitComment } from './actions';
import FruitCommentForm from './FruitCommentForm';

export async function generateMetadata(props: PageProps<'/fruits/[fruitId]'>) {
  const params = await props.params;

  const fruit = fruits.find(({ id }) => {
    return id === Number(params.fruitId);
  });

  if (!fruit) {
    return {
      title: 'Fruit not found',
    };
  }

  return {
    title: fruit.name,
    description: `${fruit.emoji} ${fruit.name}`,
  };
}

// // You can also use a type for this
// type Props = {
//   params: Promise<{ fruitId: string }>;
// };

export default async function FruitPage(props: PageProps<'/fruits/[fruitId]'>) {
  const params = await props.params;

  const fruit = fruits.find(({ id }) => {
    return id === Number(params.fruitId);
  });

  if (!fruit) {
    notFound();
  }

  // // Example data:
  // const fruitComments = [
  //   {
  //     id: 1,
  //     fruitId: 4,
  //     comment: 'Delicious',
  //   },
  //   {
  //     id: 2,
  //     fruitId: 5,
  //     comment: 'Not my thing',
  //   },
  // ];

  const fruitCommentsCookieValue = (await cookies()).get(
    'fruitComments',
  )?.value;

  const fruitComments =
    (parseJson(fruitCommentsCookieValue) as FruitComment[] | undefined) || []; // If cookie value is undefined, use empty array
  console.log(fruitComments);

  const fruitComment = fruitComments.find(({ fruitId }) => {
    return fruitId === Number(params.fruitId);
  })?.comment;

  return (
    <div>
      <h1>
        {fruit.emoji} {fruit.name}
      </h1>
      <h2>Comment</h2>
      <FruitCommentForm
        fruitId={Number(params.fruitId)}
        fruitComment={fruitComment}
      />
      <h2>Full cookie value</h2>
      {fruitCommentsCookieValue}
    </div>
  );
}
