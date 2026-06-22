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
      id: 1,
      name: 'iPhone 15 Pro Max 256GB',
      category: 'electronics',
      price: 1499,
      priceChange: 3.2,
      description: 'Smartphone premium me ekran Super Retina XDR',
      image: '📱',
      seller: 'TechHub Albania',
      stock: 45,
      wholesale: 1299,
      rating: 4.8,
    },
    {
      id: 2,
      name: 'MacBook Pro 16" M3 Max',
      category: 'electronics',
      price: 3599,
      priceChange: -2.1,
      description: 'Laptop i fuqishëm për profesionistë dhe zhvilluesit',
      image: '💻',
      seller: 'Apple Premium Store',
      stock: 23,
      wholesale: 3199,
      rating: 4.9,
    },
    {
      id: 7,
      name: 'Sony WH-1000XM5 Headphones',
      category: 'electronics',
      price: 449,
      priceChange: -1.2,
      description: 'Kufje wireless me anulim të zhurmës me AI',
      image: '🎧',
      seller: 'AudioWorld Tirana',
      stock: 34,
      wholesale: 349,
      rating: 4.8,
    },
    {
      id: 9,
      name: 'iPad Pro 12.9" M2 1TB',
      category: 'electronics',
      price: 1699,
      priceChange: 2.4,
      description: 'Tabletë profesionale me display Liquid Retina XDR',
      image: '📱',
      seller: 'TechHub Albania',
      stock: 29,
      wholesale: 1449,
      rating: 4.8,
    },
    {
      id: 11,
      name: 'DJI Air 3S Drone me Kamera',
      category: 'electronics',
      price: 1199,
      priceChange: 3.7,
      description: 'Drone profesional me kamera 4K dhe autonomija 46 minuta',
      image: '🚁',
      seller: 'Drone Tech Store',
      stock: 22,
      wholesale: 899,
      rating: 4.8,
    },
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
