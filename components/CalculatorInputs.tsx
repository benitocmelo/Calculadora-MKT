import React from 'react';
import { CalculatorState, CalculatedMetrics } from '../types';

interface Props {
  state: CalculatorState;
  metrics: CalculatedMetrics;
  onChange: (key: keyof CalculatorState, value: number) => void;
}

export const CalculatorInputs: React.FC<Props> = ({ state, metrics, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Costs Card */}
      <div className="bg-white/5 backdrop-blur-md border border-white/5 rounded-[20px] p-8">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <i className="fa-solid fa-calculator text-emerald-400"></i> Costos Base
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block text-[#a0a0a0] text-sm font-medium mb-1.5">Costo del Producto (€)</label>
            <input
              type="number"
              value={state.costProduct}
              onChange={(e) => onChange('costProduct', parseFloat(e.target.value) || 0)}
              step="0.10"
              className="bg-[#1a1a1a] border border-[#333] text-white rounded-lg p-3 w-full text-lg focus:outline-none focus:border-[#11caa0] focus:ring-1 focus:ring-[#11caa0] transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">Incluye manufactura.</p>
          </div>

          <div>
            <label className="block text-[#a0a0a0] text-sm font-medium mb-1.5">Costo de Envío (€)</label>
            <input
              type="number"
              value={state.costShipping}
              onChange={(e) => onChange('costShipping', parseFloat(e.target.value) || 0)}
              step="0.10"
              className="bg-[#1a1a1a] border border-[#333] text-white rounded-lg p-3 w-full text-lg focus:outline-none focus:border-[#11caa0] focus:ring-1 focus:ring-[#11caa0] transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">Envío a España.</p>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <label className="flex justify-between text-[#a0a0a0] text-sm font-medium mb-1.5">
              Objetivo Marketing (%)
              <span className="text-emerald-400 font-bold">{state.marketingPercent}%</span>
            </label>
            <input
              type="range"
              min="10"
              max="40"
              value={state.marketingPercent}
              onChange={(e) => onChange('marketingPercent', parseInt(e.target.value))}
              step="5"
            />
            <p className="text-xs text-gray-500 mt-1">Recomendado: Máximo 20% del precio de venta.</p>
            <div className="bg-emerald-900/30 border border-emerald-500/30 p-2 rounded mt-2 text-xs text-emerald-200">
              CPA Objetivo (1 Unidad): <span className="font-bold">{metrics.targetCPA.toFixed(2)}€</span>
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-[#a0a0a0] text-sm font-medium mb-1.5">Otros Gastos (%)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={state.taxRate}
                onChange={(e) => onChange('taxRate', parseFloat(e.target.value) || 0)}
                className="bg-[#1a1a1a] border border-[#333] text-white rounded-lg p-2 w-20 text-center focus:outline-none focus:border-[#11caa0]"
              />
              <span className="text-gray-500 text-sm">Pasarela de pago + Shopify (aprox 3-5%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions Card */}
      <div className="bg-emerald-900/10 backdrop-blur-md border border-emerald-500/20 rounded-[20px] p-8">
        <h3 className="font-bold text-white mb-3 flex items-center gap-2">
          <i className="fa-solid fa-circle-info text-emerald-400"></i> Guía Rápida
        </h3>
        <ul className="text-sm space-y-3 text-gray-300">
          <li className="flex gap-3">
            <span className="bg-emerald-500/20 text-emerald-400 w-6 h-6 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-xs">1</span>
            <span><strong>Gastos Reales:</strong> Costo de poner el producto en España.</span>
          </li>
          <li className="flex gap-3">
            <span className="bg-emerald-500/20 text-emerald-400 w-6 h-6 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-xs">2</span>
            <span><strong>Pago a Facebook:</strong> Parte del pastel para publicidad.</span>
          </li>
          <li className="flex gap-3">
            <span className="bg-emerald-500/20 text-emerald-400 w-6 h-6 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-xs">3</span>
            <span><strong>Tu Bolsillo:</strong> Lo que te llevas limpio.</span>
          </li>
        </ul>
        <div className="mt-4 p-3 bg-black/30 rounded-lg text-xs text-gray-400 italic border-l-2 border-emerald-500">
          <strong className="text-white block mb-1">💡 El Truco Pro:</strong>
          "Fíjate en los Packs. Ganas más dinero porque Facebook te cobra lo mismo por traer un cliente, pero tú le vendes más."
        </div>
      </div>

      {/* Total Costs Summary */}
      <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#333] flex justify-between items-center">
        <span className="text-gray-400">Costo Total (Landed):</span>
        <span className="text-xl font-bold text-white">{metrics.totalLandedCost.toFixed(2)}€</span>
      </div>
    </div>
  );
};