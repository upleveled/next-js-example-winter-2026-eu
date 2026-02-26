import sjson from 'secure-json-parse';
import type { FruitComment } from '../app/fruits/[fruitId]/actions';

export function parseJson(json: string | undefined) {
  if (!json) return undefined;
  try {
    // Lying to TypeScript: telling TypeScript
    // that you know the value better, but it
    // may not be this value
    return sjson(json) as FruitComment[] | boolean;
  } catch {
    return undefined;
  }
}
