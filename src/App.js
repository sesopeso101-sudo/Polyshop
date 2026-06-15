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
      id: 3,
      name: 'Kafeja Luksus Premium - 500g',
      category: 'food',
      price: 48,
      priceChange: 1.5,
      description: 'Kafe organike cilësie të lartë nga Etiopi dhe Kolumbi',
      image: '☕',
      seller: 'Specialty Coffee House',
      stock: 320,
      wholesale: 32,
      rating: 4.6,
    },
    {
      id: 4,
      name: 'Jordans Air Jordan 1 Retro',
      category: 'clothing',
      price: 185,
      priceChange: 0.8,
      description: 'Këpucë sportive legjendare edicion limituar',
      image: '👟',
      seller: 'SneakerBay Premium',
      stock: 67,
      wholesale: 125,
      rating: 4.7,
    },
    {
      id: 5,
      name: 'Samsung OLED TV 65" 4K 144Hz',
      category: 'home',
      price: 2899,
      priceChange: 5.3,
      description: 'Televizor i mençur me OLED të pastër dhe përfundim 144Hz',
      image: '📺',
      seller: 'ElectroHome Premium',
      stock: 18,
      wholesale: 2399,
      rating: 4.5,
    },
    {
      id: 6,
      name: 'Servis Kompleks Restaurimi Makine',
      category: 'services',
      price: 650,
      priceChange: 2.1,
      description: 'Servis profesional me teknologji të avancuar diagnostike',
      image: '🚗',
      seller: 'BMW AutoService Elite',
      stock: 999,
      wholesale: 480,
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
      id: 8,
      name: 'The North Face Gore-Tex Jacket',
      category: 'clothing',
      price: 485,
      priceChange: -0.5,
      description: 'Xhaketa profesionale për eksploratorët e mundeve',
      image: '🧥',
      seller: 'OutdoorGear Alpines',
      stock: 42,
      wholesale: 349,
      rating: 4.7,
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
      id: 10,
      name: 'Rolex Submariner Replica Luksus',
      category: 'clothing',
      price: 599,
      priceChange: 4.2,
      description: 'Orë luksore me mekanizëm presizo hapsinor',
      image: '⌚',
      seller: 'Luxury Time Boutique',
      stock: 15,
      wholesale: 449,
      rating: 4.9,
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
      id: 12,
      name: 'Konsultim Legal - Paket Vjetore',
      category: 'services',
      price: 2500,
      priceChange: 1.8,
      description: 'Servis konsultimi ligjor profesional për bizneset',
      image: '⚖️',
      seller: 'Law Firm Excellence',
      stock: 999,
      wholesale: 1800,
      rating: 4.9,
    },
    {
      id: 13,
      name: 'Armani Exchange Koleksion Jaka',
      category: 'clothing',
      price: 325,
      priceChange: -1.1,
      description: 'Jaka premium me dizajn italian eksklusiv',
      image: '👔',
      seller: 'Fashion House Milano',
      stock: 56,
      wholesale: 215,
      rating: 4.7,
    },
    {
      id: 14,
      name: 'Sofa Premium Lux Italia - 3 Vende',
      category: 'home',
      price: 3499,
      priceChange: 2.8,
      description: 'Sofa luksore me kuotat lëvizëse dhe material piele premium',
      image: '🛋️',
      seller: 'Furniture Elegance',
      stock: 8,
      wholesale: 2699,
      rating: 4.8,
    },
    {
      id: 15,
      name: 'Thermostat Inteligjent Nest Pro',
      category: 'home',
      price: 349,
      priceChange: 1.9,
      description: 'Termostat i mençur me kontrollin e zërit dhe automatizim',
      image: '🌡️',
      seller: 'Smart Home Solutions',
      stock: 87,
      wholesale: 249,
      rating: 4.7,
    },
    {
      id: 16,
      name: 'Paket Trajnimi Personal - 12 Sesione',
      category: 'services',
      price: 1200,
      priceChange: 0.5,
      description: 'Program trajnimi personal me ushtrues të sertifikuar',
      image: '💪',
      seller: 'Fitness Elite Gym',
      stock: 999,
      wholesale: 850,
      rating: 4.8,
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
