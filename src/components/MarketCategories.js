import React from 'react';
import { BarChart3, DollarSign, Globe, Zap } from 'lucide-react';

function MarketCategories() {
  const categories = [
    { icon: DollarSign, label: 'Finance', count: '1,240 markets', color: 'from-green-500 to-emerald-500' },
    { icon: Globe, label: 'Politics', count: '892 markets', color: 'from-blue-500 to-cyan-500' },
    { icon: BarChart3, label: 'Economics', count: '567 markets', color: 'from-purple-500 to-pink-500' },
    { icon: Zap, label: 'Technology', count: '1,456 markets', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <section className="section-padding bg-slate-50">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-3">Browse by Category</h2>
          <p className="text-lg text-slate-600">Explore markets across different sectors and find opportunities that interest you</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div key={i} className="card group hover:shadow-xl cursor-pointer transition-all duration-300">
                <div className={`w-12 h-12 bg-gradient-to-br ${cat.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{cat.label}</h3>
                <p className="text-sm text-slate-600">{cat.count}</p>
                <div className="mt-4 flex items-center text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition">
                  Explore →
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default MarketCategories;
