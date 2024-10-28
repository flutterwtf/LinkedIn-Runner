export function isHashedUrl(url: string): boolean {
  return url.toLowerCase() !== url;
}
