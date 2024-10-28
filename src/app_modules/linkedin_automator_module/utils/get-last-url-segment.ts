export function getLastUrlSegment(url: string): string | undefined {
  const trimmedUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const segments = trimmedUrl.split('/');

  return segments[segments.length - 1];
}
