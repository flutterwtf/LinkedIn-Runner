import { createHash } from 'crypto';

export function hashObject(obj: object): string {
  const jsonString = JSON.stringify(obj);
  const hash = createHash('md5').update(jsonString).digest('hex');

  return hash;
}
