import React from 'react';

function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Mirë se vini në Polyshop</h2>
        <p className="text-xl mb-6">Tregu Dixhital i Shqipërisë - Cilësia, Besueshmëria, Shërbimi</p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded font-bold hover:bg-gray-100">
          Filloni të Blisni
        </button>
      </div>
    </div>
  );
}

export default HeroSection;