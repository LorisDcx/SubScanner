import { SubscriptionCategoryId } from "./category";

export type Brand = {
  displayName: string;
  website: string;
  logo?: string;
  domain?: string;
  category?: SubscriptionCategoryId;
};

export type BrandMapping = Record<string, Brand>;
