import { deepClone } from './deep-clone';

export function deepCloneMap<K, V>(map: Map<K, V>): Map<K, V> {
  const clonedMap = new Map<K, V>();

  for (const [key, value] of map) {
    clonedMap.set(deepClone(key), deepClone(value));
  }

  return clonedMap;
}
