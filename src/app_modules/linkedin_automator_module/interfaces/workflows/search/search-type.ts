export const SEARCH_TYPE = {
  companies: 'companies',
} as const;
export type TSearchType = (typeof SEARCH_TYPE)[keyof typeof SEARCH_TYPE];
