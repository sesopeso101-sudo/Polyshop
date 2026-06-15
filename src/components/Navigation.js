import React from 'react';
import './Navigation.css';

function Navigation({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <nav className="navigation">
      <div className="nav-container">
        {categories.map(category => (
          <button
            key={category.id}
            className={`nav-item ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="nav-emoji">{category.emoji}</span>
            <span className="nav-label">{category.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;