export type SubscriptionTag = "GARDER" | "RESILIER" | "A_VERIFIER";

export type Subscription = {
  id: string;
  labelRaw: string;
  labelNormalized: string;
  amountMonthly: number;
  amountYearly: number;
  lastOperationDate: string;
  userTag?: SubscriptionTag;
  displayName?: string;
  logo?: string;
  website?: string;
};

export type AnalysisResult = {
  totalMonthly: number;
  totalYearly: number;
  subscriptions: Subscription[];
};
