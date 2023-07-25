export interface IInvestment {
  id: number;
  investmentName: string;
  investedAmount: number;
  currentAmount: number;
  currency: "INR" | "USD";
  assetType: string;
}
