export const FIBERY_DOCUMENT_FORMAT = {
  md: 'md',
  json: 'json',
  html: 'html',
} as const;
export type TFiberyDocumentFormat =
  (typeof FIBERY_DOCUMENT_FORMAT)[keyof typeof FIBERY_DOCUMENT_FORMAT];
