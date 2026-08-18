import React from 'react';

const SubscriptionCard = ({ subscription, onEdit, onDelete, isUpcoming }) => {
  const getDaysUntilBilling = () => {
    const today = new Date();
    const currentDate = today.getDate();
    const billingDate = subscription.billing_date;

    let daysUntil;
    if (billingDate >= currentDate) {
      daysUntil = billingDate - currentDate;
    } else {
      const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      const daysInCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
      const daysLeft = daysInCurrentMonth - currentDate;
      daysUntil = daysLeft + billingDate;
    }
    return daysUntil;
  };

  const daysUntil = getDaysUntilBilling();
  const billingText = daysUntil === 0 ? 'Today' : `in ${daysUntil} days`;

  return (
    <div className={`subscription-card ${isUpcoming ? 'upcoming' : ''}`}>
      <div className="card-header">
        <div className="card-title">
          <h3>{subscription.service_name}</h3>
          {subscription.category && <span className="category-badge">{subscription.category}</span>}
        </div>
        <div className="card-actions">
          <button className="btn-edit" onClick={() => onEdit(subscription)}>
            Edit
          </button>
          <button className="btn-delete" onClick={() => onDelete(subscription.id)}>
            Delete
          </button>
        </div>
      </div>

      <div className="card-body">
        <div className="card-row">
          <span className="label">Monthly Cost:</span>
          <span className="value">${parseFloat(subscription.monthly_cost).toFixed(2)}</span>
        </div>
        <div className="card-row">
          <span className="label">Billing Date:</span>
          <span className="value">Day {subscription.billing_date} ({billingText})</span>
        </div>
        <div className="card-row">
          <span className="label">Status:</span>
          <span className={`status ${subscription.is_active ? 'active' : 'inactive'}`}>
            {subscription.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      {isUpcoming && <div className="upcoming-badge">Billing Soon</div>}

      <style>{`
        .subscription-card {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }
        .subscription-card.upcoming {
          border-color: #ff9800;
          box-shadow: 0 2px 8px rgba(255, 152, 0, 0.2);
        }
        .subscription-card:hover {
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }
        .card-title h3 {
          margin: 0 0 0.5rem 0;
          color: #333;
        }
        .category-badge {
          display: inline-block;
          background-color: #e0e0e0;
          color: #333;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        .card-actions {
          display: flex;
          gap: 0.5rem;
        }
        .btn-edit,
        .btn-delete {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .btn-edit {
          background-color: #2196F3;
          color: white;
        }
        .btn-edit:hover {
          background-color: #1976D2;
        }
        .btn-delete {
          background-color: #f44336;
          color: white;
        }
        .btn-delete:hover {
          background-color: #da190b;
        }
        .card-body {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .card-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .label {
          color: #666;
          font-weight: 500;
        }
        .value {
          color: #333;
          font-weight: 600;
        }
        .status {
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .status.active {
          background-color: #d4edda;
          color: #155724;
        }
        .status.inactive {
          background-color: #f8d7da;
          color: #721c24;
        }
        .upcoming-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: #ff9800;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        .subscription-card {
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default SubscriptionCard;
