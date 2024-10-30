export const CACHE_TYPE = {
  accountUrlAccountName: 'Account URL -> Account name',
  publicUrlHashedUrl: 'Public URL <-> Hashed URL',
} as const;
export type TCacheType = (typeof CACHE_TYPE)[keyof typeof CACHE_TYPE];
