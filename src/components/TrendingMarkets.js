import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';

function PopularItems() {
  const items = [
    { title: 'iPhone 17 Pro - Telefon', category: 'Elektronikë', rating: 4.8, reviews: 245, hot: true, price: '1,299€', image: '📱' },
    { title: 'Laptop Gaming ASUS ROG', category: 'Kompjuterë', rating: 4.9, reviews: 189, hot: true, price: '2,599€', image: '💻' },
    { title: 'Shërbim Web Design', category: 'Shërbime IT', rating: 4.7, reviews: 156, hot: false, price: 'Nga 1,500€', image: '🎨' },
    { title: 'Konsultim Marketing Digital', category: 'Konsultimi', rating: 4.6, reviews: 98, hot: false, price: '899€', image: '📊' },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="heading-2 mb-3">Më të Kërkuara Tani</h2>
            <p className="text-lg text-slate-600">Produktet dhe shërbime më të popullarizuara me vlerësimet më të larta të klientëve</p>
          </div>
          <button className="btn-outline hidden md:inline-flex">Shiko Të Gjitha</button>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="card group hover:bg-slate-50 flex items-center justify-between cursor-pointer transition">
              <div className="flex items-center gap-4 flex-1">
                <div className="text-3xl">{item.image}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition">{item.title}</h4>
                    {item.hot && <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">🔥 Në Trend</span>}
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500" fill="currentColor" />
                      <span className="text-xs font-semibold text-slate-700">{item.rating}</span>
                      <span className="text-xs text-slate-500">({item.reviews})</span>
                    </div>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-600">{item.category}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-blue-600">{item.price}</span>
                <button className="btn-primary text-xs py-1 px-3 inline-flex items-center gap-1">
                  <ShoppingCart size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularItems;