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
    { id: 'food', label: 'Ushqim', emoji: '🍔' },
    { id: 'clothing', label: 'Rrobat', emoji: '👕' },
    { id: 'home', label: 'Shtëpia', emoji: '🏠' },
    { id: 'services', label: 'Shërbime', emoji: '🔧' },
  ];

  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      category: 'electronics',
      price: 1299,
      priceChange: 3.2,
      description: 'Smartphone premium me ekran të ri',
      image: '📱',
      seller: 'TechHub AL',
      stock: 45,
      wholesale: 1099,
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Laptop Dell XPS 15',
      category: 'electronics',
      price: 1599,
      priceChange: -2.1,
      description: 'Laptop i fuqishëm për zhvilluesit',
      image: '💻',
      seller: 'CompuStore',
      stock: 23,
      wholesale: 1350,
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Kafe e Mirë Aromatike',
      category: 'food',
      price: 12,
      priceChange: 1.5,
      description: 'Kafe cilësie të lartë nga Brazili',
      image: '☕',
      seller: 'CaféShop Tirana',
      stock: 120,
      wholesale: 9.5,
      rating: 4.6,
    },
    {
      id: 4,
      name: 'Nike Air Force 1',
      category: 'clothing',
      price: 130,
      priceChange: 0.8,
      description: 'Këpucë klasike sportive',
      image: '👟',
      seller: 'SneakerBay',
      stock: 67,
      wholesale: 85,
      rating: 4.7,
    },
    {
      id: 5,
      name: 'LED Smart TV 55"',
      category: 'home',
      price: 599,
      priceChange: 5.3,
      description: 'Televizor i mençur me 4K',
      image: '📺',
      seller: 'ElectroHome',
      stock: 18,
      wholesale: 480,
      rating: 4.5,
    },
    {
      id: 6,
      name: 'Servis Zvarritjeje Makine',
      category: 'services',
      price: 85,
      priceChange: 2.1,
      description: 'Shërbim profesional zvarritjeje',
      image: '🚗',
      seller: 'AutoService Pro',
      stock: 999,
      wholesale: 65,
      rating: 4.9,
    },
    {
      id: 7,
      name: 'AirPods Pro Max',
      category: 'electronics',
      price: 549,
      priceChange: -1.2,
      description: 'Kufje wireless të avancuara',
      image: '🎧',
      seller: 'AudioWorld',
      stock: 34,
      wholesale: 420,
      rating: 4.8,
    },
    {
      id: 8,
      name: 'Xhaketa Zyll Gore-Tex',
      category: 'clothing',
      price: 280,
      priceChange: -0.5,
      description: 'Xhaketa e qëndrueshme për moti',
      image: '🧥',
      seller: 'OutdoorGear',
      stock: 42,
      wholesale: 200,
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