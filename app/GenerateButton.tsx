'use client';

import { useState } from 'react';

export default function GenerateButton() {
  const [color, setColor] = useState('rgb(10,10,10);');

  return (
    <button
      data-test-id="generate-button"
      style={{ backgroundColor: color }}
      onClick={() => {
        setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
      }}
    >
      generate
    </button>
  );
}
