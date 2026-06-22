import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import TrendingSection from './components/TrendingSection';
import ProductCard from './components/ProductCard';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('trending');
  const [purchaseType, setPurchaseType] = useState('normal');

  const categories = [
    { id: 'trending', label: 'Në Trend', emoji: '📈' },
    { id: 'electronics', label: 'Elektronika', emoji: '💻' },
  ];

  const products = [
    {
      id: 17,
      name: 'Car Radio 7010B',
      category: 'electronics',
      price: 89,
      priceChange: 0.0,
      description: 'Radio makine me ekran digjital, Bluetooth dhe aux input',
      image: '📻',
      seller: 'Auto Electronics Store',
      stock: 56,
      wholesale: 59,
      rating: 4.6,
    },
    {
      id: 18,
      name: 'Car Radio 1807BT',
      category: 'electronics',
      price: 129,
      priceChange: 1.2,
      description: 'Radio makine me Bluetooth, USB, MP3 dhe kontrollin zërit',
      image: '📻',
      seller: 'Auto Electronics Store',
      stock: 42,
      wholesale: 89,
      rating: 4.7,
    },
  ];

  const filteredProducts = selectedCategory === 'trending' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="app">
      <Header purchaseType={purchaseType} setPurchaseType={setPurchaseType} />
      <Navigation 
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      
      {selectedCategory === 'trending' && (
        <TrendingSection products={products} purchaseType={purchaseType} />
      )}

      <main className="main-content">
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              purchaseType={purchaseType}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
