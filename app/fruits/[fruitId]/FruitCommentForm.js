'use client';
import { useEffect, useState } from 'react';
import { updateComment } from './actions';

export default function FruitCommentForm(props) {
  const [comment, setComment] = useState(props.fruitComment);

  // Not recommended, ESLint error
  // https://react.dev/learn/you-might-not-need-an-effect
  useEffect(() => {
    setComment(props.fruitComment);
  }, [props.fruitComment]);

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
