import React from 'react';
import { Smartphone, Car, Home, Wrench } from 'lucide-react';

function MarketCategories() {
  const categories = [
    { icon: Smartphone, label: 'Elektronikë', count: '15 produkte', color: 'from-green-500 to-emerald-500' },
    { icon: Car, label: 'Makina', count: '8 produkte', color: 'from-blue-500 to-cyan-500' },
    { icon: Home, label: 'Pasuri', count: '12 produkte', color: 'from-purple-500 to-pink-500' },
    { icon: Wrench, label: 'Shërbime', count: '20 produkte', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <section className="section-padding bg-slate-50">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-3">Shfletimi sipas Kategorisë</h2>
          <p className="text-lg text-slate-600">Eksploroni produktet në kategori të ndryshme dhe gjeni atë që kërkoni</p>
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
                  Shfletoni →
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