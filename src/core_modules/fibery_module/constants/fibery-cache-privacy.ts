export const FIBERY_CACHE_PRIVACY = {
  public: 'Public',
  private: 'Private',
} as const;
export type TFiberyCachePrivacy = (typeof FIBERY_CACHE_PRIVACY)[keyof typeof FIBERY_CACHE_PRIVACY];
