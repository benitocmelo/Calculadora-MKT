export interface CalculatorState {
  costProduct: number;
  costShipping: number;
  marketingPercent: number;
  taxRate: number;
  price1: number;
  price2: number;
  price3: number;
}

export interface CalculatedMetrics {
  totalLandedCost: number;
  targetCPA: number;
  suggestedPrice: number;
  
  // Single Unit
  profit1: number;
  margin1: number;
  maxCPA1: number;
  minROAS1: number;
  
  // Pack 2
  profit2: number;
  diff2: number;
  maxCPA2: number;
  minROAS2: number;
  
  // Pack 3
  profit3: number;
  diff3: number;
  maxCPA3: number;
  minROAS3: number;
}