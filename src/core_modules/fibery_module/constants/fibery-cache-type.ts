export const FIBERY_CACHE_TYPE = {
  accountUrlAccountName: 'Account URL -> Account name',
  publicUrlHashedUrl: 'Public URL <-> Hashed URL',
} as const;
export type TFiberyCacheType = (typeof FIBERY_CACHE_TYPE)[keyof typeof FIBERY_CACHE_TYPE];
