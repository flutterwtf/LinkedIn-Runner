export const PAGE_TYPE = {
  original: 'original',
  additional: 'additional',
} as const;
export type TPageType = (typeof PAGE_TYPE)[keyof typeof PAGE_TYPE];
