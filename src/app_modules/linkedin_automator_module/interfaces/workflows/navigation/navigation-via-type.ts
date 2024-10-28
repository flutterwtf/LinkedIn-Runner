export const NAVIGATION_VIA_TYPE = {
  connections: 'connections',
  search: 'search',
  direct: 'direct',
} as const;
export type TNavigationViaType = (typeof NAVIGATION_VIA_TYPE)[keyof typeof NAVIGATION_VIA_TYPE];
