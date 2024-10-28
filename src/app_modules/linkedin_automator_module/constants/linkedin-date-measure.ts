export const LINKEDIN_DATE_MEASURE = {
  m: 'm',
  h: 'h',
  d: 'd',
  w: 'w',
  mo: 'mo',
  yr: 'yr',
} as const;
export type TLinkedInDateMeasure =
  (typeof LINKEDIN_DATE_MEASURE)[keyof typeof LINKEDIN_DATE_MEASURE];
export const LINKEDIN_DATE_MEASURE_VALUE = Object.fromEntries(
  Object.keys(LINKEDIN_DATE_MEASURE).map((key, index) => [key, index]),
) as {
  [K in keyof typeof LINKEDIN_DATE_MEASURE]: number;
};
