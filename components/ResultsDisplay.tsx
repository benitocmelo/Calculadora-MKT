import React from 'react';
import { CalculatorState, CalculatedMetrics } from '../types';

interface Props {
  state: CalculatorState;
  metrics: CalculatedMetrics;
  onChange: (key: keyof CalculatorState, value: number) => void;
}

export const ResultsDisplay: React.FC<Props> = ({ state, metrics, onChange }) => {
  const getBadge = (margin: number) => {
    if (margin < 15) return { text: 'RIESGO ALTO', color: 'text-[#ff4d4d]', bg: 'bg-[#ff4d4d]/20' };
    if (margin < 25) return { text: 'ACEPTABLE', color: 'text-[#ffc800]', bg: 'bg-[#ffc800]/20' };
    return { text: 'GANADOR', color: 'text-[#11caa0]', bg: 'bg-[#11caa0]/20' };
  };

  const badge = getBadge(metrics.margin1);
  const maxProfit = Math.max(metrics.profit1, metrics.profit2, metrics.profit3, 10);

  return (
    <div className="space-y-8">
      {/* Single Unit */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-bold text-white">
            <i className="fa-solid fa-user text-emerald-400 mr-2"></i> Oferta Estándar (1 Unidad)
          </h3>
          <div className="text-sm text-gray-400">Regla x3 aplicada automáticamente</div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/5 rounded-[20px] overflow-hidden">
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 md:border-r border-gray-800 md:pr-6">
              <label className="text-emerald-400 text-sm font-bold">Precio de Venta (€)</label>
              <input
                type="number"
                value={state.price1}
                onChange={(e) => onChange('price1', parseFloat(e.target.value) || 0)}
                className="text-3xl font-bold bg-transparent border-none p-0 mt-2 text-white focus:ring-0 w-full focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-2">Sugerido: <span className="text-white font-mono">{metrics.suggestedPrice.toFixed(2)}€</span></p>
            </div>

            <div className="md:col-span-1 text-center">
              <p className="text-sm text-gray-400">Beneficio Neto</p>
              <div className={`text-3xl font-bold leading-tight my-2 ${badge.color === 'text-[#ff4d4d]' ? 'text-red-500' : badge.color === 'text-[#ffc800]' ? 'text-yellow-400' : 'text-emerald-400'}`}>
                {metrics.profit1.toFixed(2)}€
              </div>
              <div className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block ${badge.bg} ${badge.color}`}>
                {badge.text}
              </div>
            </div>

            <div className="md:col-span-1 text-center">
              <p className="text-sm text-gray-400">Margen Neto</p>
              <div className="text-3xl font-bold leading-tight my-2 text-gray-300">{metrics.margin1.toFixed(1)}%</div>
              <p className="text-xs text-gray-500">Objetivo: &gt;20%</p>
            </div>
          </div>
          
          {/* Break-even Footer */}
          <div className="bg-slate-900/60 border-t border-white/5 px-6 py-3 flex justify-between items-center text-xs">
            <span className="text-red-300 font-bold tracking-wide">
              ⛔️ Apagar si ROAS &lt; {metrics.minROAS1.toFixed(2)}
            </span>
            <span className="text-emerald-100/80 font-mono">
              💸 Max CPA: <span className="text-white font-bold">{metrics.maxCPA1.toFixed(2)}€</span>
            </span>
          </div>
        </div>
      </section>

      {/* Bundles */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-bold text-white">
            <i className="fa-solid fa-boxes-stacked text-[#deff9a] mr-2"></i> Estrategia de Volumen (Bundles)
          </h3>
          <div className="hidden md:block text-sm text-emerald-400 font-bold bg-emerald-900/30 px-3 py-1 rounded-lg">
            CPA Fijo = Beneficio Multiplicado
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pack 2 */}
          <div className="bg-[#151515] border border-[#222] rounded-2xl relative hover:-translate-y-1 transition-transform duration-200 hover:border-[#333] overflow-hidden flex flex-col">
            <div className="p-6 flex-1">
              <div className="absolute top-0 right-0 bg-lime-400 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-lg text-white">2x</div>
                <div>
                  <h4 className="font-bold text-white">Pack Pareja</h4>
                  <p className="text-xs text-gray-400">Ahorro sugerido: 10-15%</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-gray-300">Precio Pack (€)</label>
                  <input
                    type="number"
                    value={state.price2}
                    onChange={(e) => onChange('price2', parseFloat(e.target.value) || 0)}
                    className="w-24 text-right bg-black/20 border border-gray-700 rounded py-1 px-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Beneficio:</span>
                  <span className="text-emerald-400 font-bold text-lg">{metrics.profit2.toFixed(2)}€</span>
                </div>
                <div className="w-full bg-gray-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-500" 
                    style={{ width: `${Math.max(0, (metrics.profit2 / maxProfit) * 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-center text-gray-500 mt-1">
                  {metrics.diff2 >= 0 
                    ? <span className="text-emerald-400">Ganas +{metrics.diff2.toFixed(2)}€ vs 1 unidad</span>
                    : <span className="text-red-400">Pierdes {metrics.diff2.toFixed(2)}€ vs 1 unidad</span>
                  }
                </p>
              </div>
            </div>
            
             {/* Break-even Footer */}
            <div className="bg-slate-900/60 border-t border-white/5 px-4 py-2.5 flex justify-between items-center text-[10px] md:text-xs">
              <span className="text-red-300 font-bold tracking-wide">
                ⛔️ ROAS &lt; {metrics.minROAS2.toFixed(2)}
              </span>
              <span className="text-emerald-100/80 font-mono">
                Max CPA: <span className="text-white font-bold">{metrics.maxCPA2.toFixed(2)}€</span>
              </span>
            </div>
          </div>

          {/* Pack 3 */}
          <div className="bg-[#151515] border border-emerald-500/30 rounded-2xl relative hover:-translate-y-1 transition-transform duration-200 overflow-hidden flex flex-col">
            <div className="p-6 flex-1">
              <div className="absolute top-0 right-0 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">MAX PROFIT</div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-lg text-white">3x</div>
                <div>
                  <h4 className="font-bold text-white">Pack Familiar</h4>
                  <p className="text-xs text-gray-400">Ahorro sugerido: 20-25%</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-gray-300">Precio Pack (€)</label>
                  <input
                    type="number"
                    value={state.price3}
                    onChange={(e) => onChange('price3', parseFloat(e.target.value) || 0)}
                    className="w-24 text-right bg-black/20 border border-gray-700 rounded py-1 px-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Beneficio:</span>
                  <span className="text-emerald-400 font-bold text-lg">{metrics.profit3.toFixed(2)}€</span>
                </div>
                <div className="w-full bg-gray-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-500" 
                    style={{ width: `${Math.max(0, (metrics.profit3 / maxProfit) * 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-center text-gray-500 mt-1">
                  {metrics.diff3 >= 0 
                    ? <span className="text-emerald-400">Ganas +{metrics.diff3.toFixed(2)}€ vs 1 unidad</span>
                    : <span className="text-red-400">Pierdes {metrics.diff3.toFixed(2)}€ vs 1 unidad</span>
                  }
                </p>
              </div>
            </div>

            {/* Break-even Footer */}
            <div className="bg-slate-900/60 border-t border-white/5 px-4 py-2.5 flex justify-between items-center text-[10px] md:text-xs">
              <span className="text-red-300 font-bold tracking-wide">
                ⛔️ ROAS &lt; {metrics.minROAS3.toFixed(2)}
              </span>
              <span className="text-emerald-100/80 font-mono">
                Max CPA: <span className="text-white font-bold">{metrics.maxCPA3.toFixed(2)}€</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Box */}
      {metrics.margin1 < 15 && (
        <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-xl flex items-start gap-3 animate-pulse">
          <i className="fa-solid fa-triangle-exclamation text-red-500 mt-1"></i>
          <div>
            <h4 className="text-red-500 font-bold text-sm">Alerta de Rentabilidad</h4>
            <p className="text-red-200 text-xs mt-1">El margen es muy bajo. Necesitas vender Bundles obligatoriamente o subir el precio.</p>
          </div>
        </div>
      )}
    </div>
  );
};