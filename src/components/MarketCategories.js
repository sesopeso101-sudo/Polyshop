import React from 'react';
import { Smartphone, Laptop, Wrench, BarChart3 } from 'lucide-react';

function ProductCategories() {
  const categories = [
    { icon: Smartphone, label: 'Elektronikë', count: '150+ produkte', color: 'from-green-500 to-emerald-500', emoji: '📱' },
    { icon: Laptop, label: 'Kompjuterë & Laptopë', count: '80+ produkte', color: 'from-blue-500 to-cyan-500', emoji: '💻' },
    { icon: Wrench, label: 'Shërbime IT & Dizajn', count: '45+ shërbime', color: 'from-purple-500 to-pink-500', emoji: '🛠️' },
    { icon: BarChart3, label: 'Konsultim & Marketing', count: '30+ paket', color: 'from-orange-500 to-red-500', emoji: '📊' },
  ];

  return (
    <section className="section-padding bg-slate-50">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-3">Shfletoni sipas Kategorisë</h2>
          <p className="text-lg text-slate-600">Gjeni produktet dhe shërbime që të nevojiten për çdo lloj biznesi dhe personalisht</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div key={i} className="card group hover:shadow-xl cursor-pointer transition-all duration-300">
                <div className="text-4xl mb-4">{cat.emoji}</div>
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

export default ProductCategories;