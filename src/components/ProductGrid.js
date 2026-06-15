import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';

function ProductGrid({ selectedCategory, darkMode }) {
  const products = [
    { id: 1, name: 'Laptop Pro', price: '$999', category: 'Elektronika', image: '📱' },
    { id: 2, name: 'Xhaketa Dimri', price: '$79', category: 'Veshje', image: '👔' },
    { id: 3, name: 'Libri i Teknologjisë', price: '$25', category: 'Libra', image: '📚' },
    { id: 4, name: 'Tabela Zëri', price: '$150', category: 'Elektronika', image: '🔊' },
    { id: 5, name: 'Këpucë Sporti', price: '$89', category: 'Veshje', image: '👟' },
    { id: 6, name: 'Perni Kuzhine', price: '$45', category: 'Shtëpi', image: '🍳' },
  ];

  const filtered = selectedCategory === 'Të Gjitha' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((product) => (
        <div
          key={product.id}
          className={`rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="text-6xl text-center py-8 bg-gradient-to-r from-blue-100 to-blue-50">
            {product.image}
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{product.category}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-600">{product.price}</span>
              <div className="flex gap-2">
                <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  <ShoppingCart size={20} />
                </button>
                <button className="p-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300">
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;