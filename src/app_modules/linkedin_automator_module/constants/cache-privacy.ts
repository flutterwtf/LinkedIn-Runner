export const CACHE_PRIVACY = {
  public: 'Public',
  private: 'Private',
} as const;
export type TCachePrivacy = (typeof CACHE_PRIVACY)[keyof typeof CACHE_PRIVACY];
