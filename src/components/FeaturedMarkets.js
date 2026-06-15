import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

function FeaturedMarkets() {
  const markets = [
    {
      title: "Bitcoin Price > $100K by December 2024",
      category: "Crypto",
      probability: 72,
      volume: "$48.2M",
      traders: 4582,
      trend: 'up',
      change: '+5.2%',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: "Will the Fed Cut Rates in 2024?",
      category: "Finance",
      probability: 68,
      volume: "$32.1M",
      traders: 3421,
      trend: 'down',
      change: '-2.1%',
      color: 'from-green-500 to-green-600'
    },
    {
      title: "AI Regulation Bill Passes in EU",
      category: "Politics",
      probability: 45,
      volume: "$24.8M",
      traders: 2156,
      trend: 'up',
      change: '+1.8%',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: "Netflix Subscribers Cross 500M",
      category: "Tech",
      probability: 82,
      volume: "$18.5M",
      traders: 1876,
      trend: 'up',
      change: '+3.4%',
      color: 'from-red-500 to-red-600'
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="mb-12">
          <h2 className="heading-2 mb-3">Featured Markets</h2>
          <p className="text-lg text-slate-600">Explore the most popular prediction markets with premium liquidity and real-time updates</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {markets.map((market, i) => (
            <div key={i} className="card-lg group cursor-pointer">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${market.color} text-white mb-3`}>
                    {market.category}
                  </span>
                  <h3 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition">{market.title}</h3>
                </div>
              </div>

              {/* Probability Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Market Probability</span>
                  <span className="text-2xl font-bold text-slate-900">{market.probability}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500" 
                    style={{width: `${market.probability}%`}}
                  ></div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 pb-6 border-b border-slate-200">
                <div>
                  <div className="text-xs text-slate-600 mb-1">Volume</div>
                  <div className="font-semibold text-slate-900">{market.volume}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-1">Traders</div>
                  <div className="font-semibold text-slate-900">{market.traders.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-1">24h Change</div>
                  <div className={`font-semibold flex items-center gap-1 ${market.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {market.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    {market.change}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4">
                <span className="text-xs text-slate-600">Expires in 45 days</span>
                <button className="btn-primary text-sm py-2 px-4">Trade Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedMarkets;
