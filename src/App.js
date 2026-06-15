import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedMarkets from './components/FeaturedMarkets';
import MarketCategories from './components/MarketCategories';
import TrendingMarkets from './components/TrendingMarkets';
import HowItWorks from './components/HowItWorks';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="bg-white text-slate-900">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Hero />
        <FeaturedMarkets />
        <MarketCategories />
        <TrendingMarkets />
        <HowItWorks />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}

export default App;
