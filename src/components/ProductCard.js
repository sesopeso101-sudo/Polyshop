import React, { useState } from 'react';
import './ProductCard.css';

function ProductCard({ product, purchaseType }) {
  const [isHovered, setIsHovered] = useState(false);
  const [actionType, setActionType] = useState(null);
  
  const displayPrice = purchaseType === 'wholesale' ? product.wholesale : product.price;
  const savings = purchaseType === 'wholesale' ? Math.round(((product.price - product.wholesale) / product.price) * 100) : 0;
  const isPositive = product.priceChange > 0;

  const handleAction = (type) => {
    setActionType(type);
    setTimeout(() => setActionType(null), 1200);
  };

  return (
    <div 
      className="polymarket-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Section: Image + Info */}
      <div className="card-top">
        <div className="product-image-wrapper">
          <div className="product-image">{product.image}</div>
          
          {savings > 0 && (
            <div className="offer-badge">
              <span className="offer-label">Oferta e Ditës</span>
              <span className="offer-value">-{savings}%</span>
            </div>
          )}
        </div>

        <div className="card-info">
          <div className="info-header">
            <h3 className="product-name">{product.name}</h3>
          </div>
          
          <p className="product-description">{product.description}</p>

          <div className="meta-row">
            <span className="meta-item">
              <span className="meta-icon">🏪</span>
              <span className="meta-text">{product.seller}</span>
            </span>
          </div>
        </div>

        {/* Top Right: Price Change Indicator */}
        <div className="price-change-indicator">
          <div className={`change-badge ${isPositive ? 'positive' : 'negative'}`}>
            <div className="change-percentage">
              {isPositive ? '+' : ''}{product.priceChange}%
            </div>
            <div className="change-direction">
              {isPositive ? '▲' : '▼'}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Stock + Actions */}
      <div className="card-bottom">
        <div className="stock-delivery">
          <div className="stock-item">
            <span className="stock-label">Në Stok</span>
            <span className="stock-badge">{product.stock > 100 ? '100+' : product.stock}</span>
          </div>
          <div className="delivery-item">
            <span className="delivery-icon">🚀</span>
            <span className="delivery-label">Dërgesë e Shpejtë</span>
          </div>
        </div>

        {/* Price + Action Buttons */}
        <div className="action-area">
          <div className="price-display">
            <span className="currency">€</span>
            <span className="price-value">{displayPrice.toFixed(2)}</span>
            {purchaseType === 'wholesale' && product.price !== product.wholesale && (
              <span className="original-price">€{product.price.toFixed(2)}</span>
            )}
          </div>

          <div className="button-group">
            <button 
              className={`action-btn normal-btn ${actionType === 'normal' ? 'active' : ''} ${isHovered ? 'hovered' : ''}`}
              onClick={() => handleAction('normal')}
              title="Çmimi Normal"
            >
              <span className="btn-label">Çmimi Normal</span>
              {actionType === 'normal' && <span className="action-feedback">✓</span>}
            </button>
            
            <button 
              className={`action-btn wholesale-btn ${actionType === 'wholesale' ? 'active' : ''} ${isHovered ? 'hovered' : ''}`}
              onClick={() => handleAction('wholesale')}
              title="Çmimi Shumicë"
            >
              <span className="btn-label">Çmimi Shumicë</span>
              {actionType === 'wholesale' && <span className="action-feedback">✓</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Animated Hover Glow */}
      {isHovered && <div className="hover-glow"></div>}
    </div>
  );
}

export default ProductCard;
