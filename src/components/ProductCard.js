import React, { useState } from 'react';
import './ProductCard.css';

function ProductCard({ product, purchaseType }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const displayPrice = purchaseType === 'wholesale' ? product.wholesale : product.price;
  const savings = purchaseType === 'wholesale' ? Math.round(((product.price - product.wholesale) / product.price) * 100) : 0;

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container">
        <div className="product-image">{product.image}</div>
        
        {savings > 0 && (
          <div className="savings-badge">
            -{savings}%
          </div>
        )}
        
        <div className={`price-change ${product.priceChange > 0 ? 'positive' : 'negative'}`}>
          <span className="change-icon">{product.priceChange > 0 ? '📈' : '📉'}</span>
          <span className="change-value">{Math.abs(product.priceChange)}%</span>
        </div>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-meta">
          <div className="seller-info">
            <span className="seller-label">🏪 {product.seller}</span>
          </div>
          
          <div className="rating">
            <span className="stars">⭐</span>
            <span className="rating-value">{product.rating}</span>
          </div>
        </div>

        <div className="stock-info">
          <span className="stock-label">Në stok:</span>
          <span className="stock-value">{product.stock}</span>
        </div>

        <div className="purchase-type-badge">
          {purchaseType === 'wholesale' ? 'Shumica' : 'Blerje Normale'}
        </div>
      </div>

      <div className="product-footer">
        <div className="price-section">
          <div className="current-price">
            €{displayPrice.toFixed(2)}
          </div>
          {purchaseType === 'wholesale' && product.price !== product.wholesale && (
            <div className="original-price">
              €{product.price.toFixed(2)}
            </div>
          )}
        </div>
        
        <button className={`buy-btn ${isHovered ? 'hover' : ''}`}>
          {purchaseType === 'wholesale' ? '🛒 Blej në Shumica' : '🛒 Blej'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;