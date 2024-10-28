export function removeLastSegment(url: string): string {
  const parsedUrl = new URL(url);
  parsedUrl.pathname = parsedUrl.pathname.replace(/\/[^\\/]*\/?$/, '/');

  return parsedUrl.toString();
}
