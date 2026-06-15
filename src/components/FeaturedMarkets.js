import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';

function FeaturedProducts() {
  const products = [
    {
      title: "iPhone 17 Pro - Telefon Premium",
      category: "Elektronikë",
      price: 1299,
      rating: 4.8,
      reviews: 245,
      stock: 12,
      color: 'from-orange-500 to-orange-600',
      description: 'Modeli më i ri i Apple me teknologji të avancuar dhe kamera të përmirësuar'
    },
    {
      title: "Laptop Gaming ASUS ROG - Lojëra",
      category: "Kompjuterë",
      price: 2599,
      rating: 4.9,
      reviews: 189,
      stock: 8,
      color: 'from-red-500 to-rose-600',
      description: 'Laptop i fuqishëm me procesor i9 dhe GPU RTX 4090 për lojëra profesionale'
    },
    {
      title: "Shërbim Web Design Profesional",
      category: "Shërbime IT",
      price: 1500,
      rating: 4.7,
      reviews: 156,
      stock: 99,
      color: 'from-purple-500 to-pink-600',
      description: 'Dizajn dhe zhvillim komplet i websitit me responsiv design dhe SEO optimizim'
    },
    {
      title: "Konsultim Marketing Digital - 3 Muaj",
      category: "Konsultimi",
      price: 899,
      rating: 4.6,
      reviews: 98,
      stock: 99,
      color: 'from-blue-500 to-cyan-600',
      description: 'Strategi marketingu të plotë përfshirë social media, email dhe PPC kampanja'
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="mb-12">
          <h2 className="heading-2 mb-3">Produktet dhe Shërbime të Zgjedhura</h2>
          <p className="text-lg text-slate-600">Produktet më të kërkuara dhe shërbime të cilësisë së lartë me çmimet më të mirë</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product, i) => (
            <div key={i} className="card-lg group cursor-pointer hover:shadow-xl transition-all">
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
                  <span className="text-sm text-slate-600">Çimi</span>
                  <span className="text-3xl font-bold text-slate-900">{product.price.toLocaleString()}€</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 pb-6 border-b border-slate-200">
                <div>
                  <div className="text-xs text-slate-600 mb-1">Vlerësimi</div>
                  <div className="font-semibold flex items-center gap-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    {product.rating}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-1">Shqyrtime</div>
                  <div className="font-semibold text-slate-900">{product.reviews} shqyrtime</div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-1">Gjendjeja</div>
                  <div className="font-semibold text-green-600">{product.stock > 10 ? 'Në Stok' : product.stock + ' njësi'}</div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4">
                <span className="text-xs text-slate-600">✓ Pagesa e Sigurt | ✓ Shëtim Falas</span>
                <button className="btn-primary text-sm py-2 px-4 inline-flex items-center gap-2">
                  <ShoppingCart size={16} />
                  Shto në Shporta
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;