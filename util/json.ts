import sjson from 'secure-json-parse';
import type { FruitComment } from '../app/fruits/[fruitId]/actions';

export function parseJsonFruitComments(json: string | undefined | null) {
  if (!json) return undefined;
  try {
    // Lying to TypeScript: telling TypeScript that you know the
    // value better, but it may not be this value
    return sjson(json) as FruitComment[];
  } catch {
    return undefined;
  }
}

export function parseJsonFeatureBanner(json: string | undefined | null) {
  if (!json) return undefined;
  try {
    // Lying to TypeScript: telling TypeScript that you know the
    // value better, but it may not be this value
    return sjson(json) as boolean;
  } catch {
    return undefined;
  }
}
