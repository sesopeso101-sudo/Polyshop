import React from 'react';
import './TrendingSection.css';

function TrendingSection({ products, purchaseType }) {
  const trendingProducts = products.sort((a, b) => Math.abs(b.priceChange) - Math.abs(a.priceChange)).slice(0, 5);

  return (
    <section className="trending-section">
      <div className="trending-container">
        <h2 className="trending-title">🔥 Produktet më në trend tani</h2>
        
        <div className="trending-cards">
          {trendingProducts.map((product, index) => {
            const displayPrice = purchaseType === 'wholesale' ? product.wholesale : product.price;
            
            return (
              <div key={product.id} className="trending-card">
                <div className="rank-badge">{index + 1}</div>
                
                <div className="trending-content">
                  <div className="trending-image">{product.image}</div>
                  
                  <div className="trending-info">
                    <h3 className="trending-name">{product.name}</h3>
                    <p className="trending-seller">🏪 {product.seller}</p>
                  </div>
                  
                  <div className="trending-price-section">
                    <div className="trending-price">€{displayPrice.toFixed(2)}</div>
                    <div className={`trending-change ${product.priceChange > 0 ? 'positive' : 'negative'}`}>
                      {product.priceChange > 0 ? '📈' : '📉'} {Math.abs(product.priceChange)}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrendingSection;