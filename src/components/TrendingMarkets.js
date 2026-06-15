import React from 'react';
import { ArrowUp, Flame } from 'lucide-react';

function TrendingMarkets() {
  const trending = [
    { title: 'iPhone 17 Pro - Telefona', category: 'Elektronikë', popularity: 52, change: '+8.2%', hot: true },
    { title: 'Mercedes G63 AMG - Makina', category: 'Makina', popularity: 38, change: '+12.5%', hot: true },
    { title: 'Vilë Luksoze me Qira - Pasuri', category: 'Pasuri të Paluajtshme', popularity: 61, change: '+2.3%', hot: false },
    { title: 'Shërbim Web Design - Shërbime', category: 'Shërbime', popularity: 75, change: '-1.4%', hot: false },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="heading-2 mb-3">Në Trend Tani</h2>
            <p className="text-lg text-slate-600">Produktet dhe shërbimetë që po tërheqin më shumë vëmendjen e blerësve</p>
          </div>
          <button className="btn-outline hidden md:inline-flex">Shiko Të Gjitha në Trend</button>
        </div>

        <div className="space-y-3">
          {trending.map((item, i) => (
            <div key={i} className="card group hover:bg-slate-50 flex items-center justify-between cursor-pointer transition">
              <div className="flex items-center gap-4 flex-1">
                {item.hot && <Flame size={20} className="text-orange-500 flex-shrink-0" />}
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition">{item.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-20 bg-slate-200 rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{width: `${item.popularity}%`}}></div>
                    </div>
                    <span className="text-xs text-slate-600">{item.popularity}% interes</span>
                  </div>
                </div>
              </div>
              <span className={`text-sm font-semibold flex items-center gap-1 ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                <ArrowUp size={16} />
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrendingMarkets;
