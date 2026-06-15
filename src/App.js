import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CategoryNav from './components/CategoryNav';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Të Gjitha');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen transition-colors duration-300`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <CategoryNav selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <HeroSection />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <ProductGrid selectedCategory={selectedCategory} darkMode={darkMode} />
            </div>
            <div className="hidden lg:block">
              <Sidebar darkMode={darkMode} />
            </div>
          </div>
        </div>
        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
}

export default App;
