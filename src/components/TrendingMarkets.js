import React from 'react';
import { ArrowUp, Fire } from 'lucide-react';

function TrendingMarkets() {
  const trending = [
    { title: 'Trump Wins 2024 Election', probability: 52, change: '+8.2%', hot: true },
    { title: 'Nvidia Stock > $1000 by 2024', probability: 38, change: '+12.5%', hot: true },
    { title: 'World GDP Growth > 3%', probability: 61, change: '+2.3%', hot: false },
    { title: 'Climate Summit Agreement', probability: 75, change: '-1.4%', hot: false },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="heading-2 mb-3">Trending Now</h2>
            <p className="text-lg text-slate-600">Markets gaining the most attention from traders today</p>
          </div>
          <a href="#" className="btn-outline hidden md:inline-flex">View All Trending</a>
        </div>

        <div className="space-y-3">
          {trending.map((market, i) => (
            <div key={i} className="card group hover:bg-slate-50 flex items-center justify-between cursor-pointer transition">
              <div className="flex items-center gap-4 flex-1">
                {market.hot && <Fire size={20} className="text-orange-500 flex-shrink-0" />}
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition">{market.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-20 bg-slate-200 rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{width: `${market.probability}%`}}></div>
                    </div>
                    <span className="text-xs text-slate-600">{market.probability}%</span>
                  </div>
                </div>
              </div>
              <span className={`text-sm font-semibold flex items-center gap-1 ${market.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                <ArrowUp size={16} />
                {market.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrendingMarkets;
