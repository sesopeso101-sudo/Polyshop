import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

function FeaturedMarkets() {
  const products = [
    {
      title: "iPhone 17 Pro - Telefon Premium",
      category: "Elektronikë",
      price: 1299,
      trend: 'up',
      change: '+5.2%',
      stock: 12,
      color: 'from-orange-500 to-orange-600',
      description: 'Modeli më i ri i Apple me teknologji të avancuar'
    },
    {
      title: "Mercedes G63 AMG - Makinë Luxi",
      category: "Makina",
      price: 145000,
      trend: 'down',
      change: '-2.1%',
      stock: 2,
      color: 'from-green-500 to-green-600',
      description: 'Një nga makinat më të luxut në treg'
    },
    {
      title: "MacBook Pro M4 - Kompjuter Premium",
      category: "Elektronikë",
      price: 3299,
      trend: 'up',
      change: '+1.8%',
      stock: 8,
      color: 'from-purple-500 to-purple-600',
      description: 'Laptop më i fuqishmëm për punë profesionale'
    },
    {
      title: "Vilë Luksuze me Qira - Pasuri",
      category: "Pasuri",
      price: 8500,
      trend: 'up',
      change: '+3.4%',
      stock: 1,
      color: 'from-red-500 to-red-600',
      description: 'Vilë 5 dhomash në lokacion eksklusiv'
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="mb-12">
          <h2 className="heading-2 mb-3">Produktet e Zgjedhura</h2>
          <p className="text-lg text-slate-600">Produktet më të kërkuara me çmimet më të mirë dhe ndjekjen e përditësimeve të çmimit</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product, i) => (
            <div key={i} className="card-lg group cursor-pointer">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${product.color} text-white mb-3`}>
                    {product.category}
                  </span>
                  <h3 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition">{product.title}</h3>
                  <p className="text-sm text-slate-600 mt-2">{product.description}</p>
                </div>
              </div>

              {/* Price Info */}
              <div className="mb-6 pb-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Çimi Aktual</span>
                  <span className="text-3xl font-bold text-slate-900">{product.price.toLocaleString()}€</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 pb-6 border-b border-slate-200">
                <div>
                  <div className="text-xs text-slate-600 mb-1">Ndryshim Çimi</div>
                  <div className={`font-semibold flex items-center gap-1 ${product.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {product.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    {product.change}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-1">Në Stok</div>
                  <div className="font-semibold text-slate-900">{product.stock} njësi</div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-1">Gjendjeja</div>
                  <div className="font-semibold text-green-600">Disponibël</div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4">
                <span className="text-xs text-slate-600">Shëtim i shpejtë në të gjithë Shqipërinë</span>
                <button className="btn-primary text-sm py-2 px-4">Bli Tani</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedMarkets;
