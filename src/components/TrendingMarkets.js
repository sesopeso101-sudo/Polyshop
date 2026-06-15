import React from 'react';
import { ArrowUp, Flame } from 'lucide-react';

function TrendingMarkets() {
  const trending = [
    { title: 'iPhone 17 Pro - Telefon', category: 'Elektronikë', popularity: 92, change: '+8.2%', hot: true, price: '1,299€' },
    { title: 'Mercedes G63 AMG - Makinë', category: 'Makina', popularity: 78, change: '+12.5%', hot: true, price: '145,000€' },
    { title: 'Vilë Luksuze - Pasuri', category: 'Pasuri', popularity: 61, change: '+2.3%', hot: false, price: '420,000€' },
    { title: 'Shërbim Web Design - IT', category: 'Shërbime', popularity: 85, change: '-1.4%', hot: false, price: 'Nga 500€' },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="heading-2 mb-3">Në Trend Tani</h2>
            <p className="text-lg text-slate-600">Produktet dhe shërbimetë më të kërkuara me ndryshimet më të mëdha të çmimit</p>
          </div>
          <button className="btn-outline hidden md:inline-flex">Shiko Të Gjitha</button>
        </div>

        <div className="space-y-3">
          {trending.map((item, i) => (
            <div key={i} className="card group hover:bg-slate-50 flex items-center justify-between cursor-pointer transition">
              <div className="flex items-center gap-4 flex-1">
                {item.hot && <Flame size={20} className="text-orange-500 flex-shrink-0" />}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition">{item.title}</h4>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">{item.price}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-32 bg-slate-200 rounded-full h-1.5">
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
