import React from 'react';

const SummaryPanel = ({ totalMonthly, totalAnnual, subscriptionsByCategory }) => {
  const categoryData = Object.entries(subscriptionsByCategory || {}).map(([category, cost]) => ({
    category: category || 'Uncategorized',
    cost,
  }));

  return (
    <div className="summary-panel">
      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Monthly Spend</h3>
          <p className="amount">${totalMonthly.toFixed(2)}</p>
        </div>
        <div className="summary-card">
          <h3>Total Annual Spend</h3>
          <p className="amount">${totalAnnual.toFixed(2)}</p>
        </div>
      </div>

      {categoryData.length > 0 && (
        <div className="category-breakdown">
          <h3>Breakdown by Category</h3>
          <div className="category-list">
            {categoryData.map((item) => (
              <div key={item.category} className="category-item">
                <span className="category-name">{item.category}</span>
                <span className="category-cost">${item.cost.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .summary-panel {
          margin-bottom: 2rem;
        }
        .summary-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .summary-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .summary-card h3 {
          margin: 0 0 0.5rem 0;
          font-size: 0.9rem;
          opacity: 0.9;
        }
        .summary-card .amount {
          margin: 0;
          font-size: 2rem;
          font-weight: bold;
        }
        .category-breakdown {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid #ddd;
        }
        .category-breakdown h3 {
          margin-top: 0;
          color: #333;
        }
        .category-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .category-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: #f9f9f9;
          border-radius: 4px;
        }
        .category-name {
          color: #666;
          font-weight: 500;
        }
        .category-cost {
          color: #333;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default SummaryPanel;
