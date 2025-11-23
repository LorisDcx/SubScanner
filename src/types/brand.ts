export type Brand = {
  displayName: string;
  website: string;
  logo?: string;
  domain?: string;
};

export type BrandMapping = Record<string, Brand>;
