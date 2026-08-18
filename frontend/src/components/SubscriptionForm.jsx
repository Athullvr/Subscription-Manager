import React, { useState, useEffect } from 'react';

const SubscriptionForm = ({ subscription, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    service_name: '',
    monthly_cost: '',
    billing_date: '1',
    category: '',
    is_active: true,
  });

  useEffect(() => {
    if (subscription) {
      setFormData({
        service_name: subscription.service_name,
        monthly_cost: subscription.monthly_cost,
        billing_date: subscription.billing_date,
        category: subscription.category || '',
        is_active: subscription.is_active,
      });
    }
  }, [subscription]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{subscription ? 'Edit Subscription' : 'Add New Subscription'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="service_name">Service Name</label>
            <input
              id="service_name"
              name="service_name"
              type="text"
              value={formData.service_name}
              onChange={handleChange}
              required
              placeholder="e.g., Netflix, Spotify"
            />
          </div>

          <div className="form-group">
            <label htmlFor="monthly_cost">Monthly Cost</label>
            <input
              id="monthly_cost"
              name="monthly_cost"
              type="number"
              step="0.01"
              value={formData.monthly_cost}
              onChange={handleChange}
              required
              placeholder="e.g., 9.99"
            />
          </div>

          <div className="form-group">
            <label htmlFor="billing_date">Billing Date (Day of Month)</label>
            <input
              id="billing_date"
              name="billing_date"
              type="number"
              min="1"
              max="31"
              value={formData.billing_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              id="category"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Streaming, SaaS"
            />
          </div>

          <div className="form-group checkbox">
            <input
              id="is_active"
              name="is_active"
              type="checkbox"
              checked={formData.is_active}
              onChange={handleChange}
            />
            <label htmlFor="is_active">Active</label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              {subscription ? 'Update' : 'Add'} Subscription
            </button>
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>

        <style>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 500px;
          }
          .modal-content h2 {
            margin-top: 0;
            color: #333;
          }
          .form-group {
            margin-bottom: 1.5rem;
          }
          .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #555;
            font-weight: 500;
          }
          .form-group input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
            box-sizing: border-box;
          }
          .form-group input:focus {
            outline: none;
            border-color: #4CAF50;
            box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
          }
          .form-group.checkbox {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .form-group.checkbox input {
            width: auto;
            margin: 0;
          }
          .form-group.checkbox label {
            margin: 0;
            display: inline;
          }
          .form-actions {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
          }
          .btn-submit,
          .btn-cancel {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 500;
          }
          .btn-submit {
            background-color: #4CAF50;
            color: white;
          }
          .btn-submit:hover {
            background-color: #45a049;
          }
          .btn-cancel {
            background-color: #f44336;
            color: white;
          }
          .btn-cancel:hover {
            background-color: #da190b;
          }
        `}</style>
      </div>
    </div>
  );
};

export default SubscriptionForm;
