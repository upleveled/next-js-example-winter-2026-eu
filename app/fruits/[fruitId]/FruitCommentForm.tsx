'use client';

import { useState } from 'react';
import type { Fruit } from '../../../database/fruits';
import { updateComment } from './actions';

type Props = {
  fruitId: Fruit['id'];
  fruitComment: string | undefined;
};

export default function FruitCommentForm(props: Props) {
  const [comment, setComment] = useState(props.fruitComment || '');

  // // If you need to update the state from a changed
  // // prop, 2 options below (not needed with current
  // // code because we use a Controlled Component)
  //
  // // ❌ 1. Not recommended, ESLint error
  // // https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-effect
  // useEffect(() => {
  //   setComment(props.fruitComment);
  // }, [props.fruitComment]);
  //
  // // ✅ Better pattern, recommended in React docs
  // // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  // const [previousFruitComment, setPreviousFruitComment] = useState(
  //   props.fruitComment,
  // );
  // if (props.fruitComment !== previousFruitComment) {
  //   setPreviousFruitComment(props.fruitComment);
  //   setComment(props.fruitComment);
  // }

  return (
    <form>
      <textarea
        value={comment}
        onChange={(event) => {
          setComment(event.currentTarget.value);
        }}
      />
      <button
        formAction={async () => {
          await updateComment(props.fruitId, comment);
        }}
      >
        Update
      </button>
    </form>
  );
}
