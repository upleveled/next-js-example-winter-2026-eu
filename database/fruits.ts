// Simulate a real database by importing
// the "poison pill" from 'server-only'
//
// This will cause any Client Component
// importing this file to break
import 'server-only';

export type Fruit = {
  id: number;
  name: string;
  emoji: string;
};

export const fruits: Fruit[] = [
  { id: 1, name: 'Apple', emoji: '🍎' },
  { id: 2, name: 'Banana', emoji: '🍌' },
  { id: 3, name: 'Orange', emoji: '🍊' },
  { id: 4, name: 'Strawberry', emoji: '🍓' },
  { id: 5, name: 'Grapes', emoji: '🍇' },
  { id: 6, name: 'Watermelon', emoji: '🍉' },
  { id: 7, name: 'Pineapple', emoji: '🍍' },
  { id: 8, name: 'Peach', emoji: '🍑' },
];
