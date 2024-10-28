export const LINKEDIN_FROM = {
  salesNavigator: 'salesNavigator',
  standard: 'standard',
} as const;
export type TLinkedInFrom = (typeof LINKEDIN_FROM)[keyof typeof LINKEDIN_FROM];
