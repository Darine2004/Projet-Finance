export interface Stock {
  id: string;
  name: string;
  symbol: string;
  sector: string;
  currentPrice: number;
  riskLevel: 'élevé' | 'modéré' | 'faible';
  description: string;
}

export interface Analysis {
  trend: 'hausse' | 'baisse' | 'stable';
  confidence: number;
  potentialReturn: number;
  riskLevel: string;
  recommendation: 'acheter' | 'vendre' | 'conserver';
  analysisDate: Date;
  factors: string[];
}

export interface PortfolioPosition {
  stockId: string;
  quantity: number;
  averagePurchasePrice: number;
}

export interface Portfolio {
  cash: number;
  positions: PortfolioPosition[];
  initialValue: number;
}

export interface Transaction {
  id: string;
  stockId: string;
  type: 'achat' | 'vente';
  quantity: number;
  price: number;
  date: Date;
}
