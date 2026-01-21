import React, { useState, useEffect } from 'react';
import { CalculatorInputs } from './components/CalculatorInputs';
import { ResultsDisplay } from './components/ResultsDisplay';
import { MentorChat } from './components/MentorChat';
import { CalculatorState, CalculatedMetrics } from './types';

const App: React.FC = () => {
  // --- STATE ---
  const [state, setState] = useState<CalculatorState>({
    costProduct: 8.50,
    costShipping: 4.00,
    marketingPercent: 20,
    taxRate: 5,
    price1: 29.99,
    price2: 49.99,
    price3: 69.99
  });

  const [metrics, setMetrics] = useState<CalculatedMetrics>({
    totalLandedCost: 0,
    targetCPA: 0,
    suggestedPrice: 0,
    profit1: 0,
    margin1: 0,
    maxCPA1: 0,
    minROAS1: 0,
    profit2: 0,
    diff2: 0,
    maxCPA2: 0,
    minROAS2: 0,
    profit3: 0,
    diff3: 0,
    maxCPA3: 0,
    minROAS3: 0
  });

  // --- HANDLER ---
  const handleInputChange = (key: keyof CalculatorState, value: number) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  // --- CALCULATION EFFECT ---
  useEffect(() => {
    const { costProduct, costShipping, marketingPercent, taxRate, price1, price2, price3 } = state;

    const totalLandedCost = costProduct + costShipping;
    
    // Suggested Price (x3 Rule)
    const suggestedPrice = Math.ceil(totalLandedCost * 3) - 0.01;

    // CPA Target (Based on Single Unit Price)
    const targetCPA = price1 * (marketingPercent / 100);

    // --- Single Unit ---
    const fees1 = price1 * (taxRate / 100);
    // Profit = Price - Costs - Marketing - Fees
    const profit1 = price1 - totalLandedCost - targetCPA - fees1;
    const margin1 = price1 > 0 ? (profit1 / price1) * 100 : 0;
    
    // Break-even Metrics (1 Unit)
    // Max CPA = Price - LandedCost - Fees (What remains for ads before 0 profit)
    const maxCPA1 = price1 - totalLandedCost - fees1;
    const minROAS1 = maxCPA1 > 0 ? price1 / maxCPA1 : 0;

    // --- Bundle Logic ---
    // Key Concept: CPA is fixed per order. Buying 2 units = 1 CPA.
    
    // Pack 2
    const fees2 = price2 * (taxRate / 100);
    const profit2 = price2 - (totalLandedCost * 2) - targetCPA - fees2;
    const diff2 = profit2 - profit1;
    
    // Break-even Metrics (Pack 2)
    const maxCPA2 = price2 - (totalLandedCost * 2) - fees2;
    const minROAS2 = maxCPA2 > 0 ? price2 / maxCPA2 : 0;

    // Pack 3
    const fees3 = price3 * (taxRate / 100);
    const profit3 = price3 - (totalLandedCost * 3) - targetCPA - fees3;
    const diff3 = profit3 - profit1;

    // Break-even Metrics (Pack 3)
    const maxCPA3 = price3 - (totalLandedCost * 3) - fees3;
    const minROAS3 = maxCPA3 > 0 ? price3 / maxCPA3 : 0;

    setMetrics({
      totalLandedCost,
      targetCPA,
      suggestedPrice,
      profit1,
      margin1,
      maxCPA1,
      minROAS1,
      profit2,
      diff2,
      maxCPA2,
      minROAS2,
      profit3,
      diff3,
      maxCPA3,
      minROAS3
    });

  }, [state]);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-emerald-500 selection:text-black">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-12 p-6 md:p-0 md:mt-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-lime-300 to-emerald-400 text-black font-black flex items-center justify-center rounded-xl shadow-lg shadow-emerald-900/50 text-xl">
            J
          </div>
          <div>
            <h1 className="font-bold text-2xl tracking-tight text-white leading-none">Calculadora de Ofertas</h1>
            <span className="text-xs tracking-[0.2em] text-emerald-400 font-bold uppercase">JUAN MKT Tools</span>
          </div>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-sm text-gray-400">Estrategia: <span className="text-white font-bold">One Country Dropshipping</span></p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 pb-20">
        <div className="lg:col-span-4">
          <CalculatorInputs state={state} metrics={metrics} onChange={handleInputChange} />
        </div>
        <div className="lg:col-span-8">
          <ResultsDisplay state={state} metrics={metrics} onChange={handleInputChange} />
        </div>
      </div>

      {/* Floating Chatbot */}
      <MentorChat state={state} metrics={metrics} />
    </div>
  );
};

export default App;