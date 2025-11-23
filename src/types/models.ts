export type User = {
  id: string;
  email: string;
  plan?: string;
};

export type Account = {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  totalMonthly?: number;
  totalYearly?: number;
};
