import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import SummaryPanel from '../components/SummaryPanel';
import SubscriptionCard from '../components/SubscriptionCard';
import SubscriptionForm from '../components/SubscriptionForm';

const SubscriptionDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get('/subscriptions/');
      setSubscriptions(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch subscriptions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubscription = () => {
    setEditingSubscription(null);
    setShowForm(true);
  };

  const handleEditSubscription = (subscription) => {
    setEditingSubscription(subscription);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingSubscription) {
        await axios.patch(`/subscriptions/${editingSubscription.id}/`, formData);
      } else {
        await axios.post('/subscriptions/', formData);
      }
      setShowForm(false);
      setEditingSubscription(null);
      await fetchSubscriptions();
    } catch (err) {
      setError('Failed to save subscription');
      console.error(err);
    }
  };

  const handleDeleteSubscription = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      try {
        await axios.delete(`/subscriptions/${id}/`);
        await fetchSubscriptions();
      } catch (err) {
        setError('Failed to delete subscription');
        console.error(err);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const activeSubscriptions = subscriptions.filter((s) => s.is_active);
  const today = new Date();
  const currentDate = today.getDate();

  const upcomingSubscriptions = activeSubscriptions.filter((s) => {
    const daysUntilBilling =
      s.billing_date >= currentDate
        ? s.billing_date - currentDate
        : new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() - currentDate + s.billing_date;
    return daysUntilBilling <= 7;
  });

  const totalMonthly = activeSubscriptions.reduce((sum, s) => sum + parseFloat(s.monthly_cost), 0);
  const totalAnnual = totalMonthly * 12;

  const subscriptionsByCategory = {};
  activeSubscriptions.forEach((s) => {
    const category = s.category || 'Uncategorized';
    subscriptionsByCategory[category] = (subscriptionsByCategory[category] || 0) + parseFloat(s.monthly_cost);
  });

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Subscription Manager</h1>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {error && <div className="error-message">{error}</div>}

      <SummaryPanel
        totalMonthly={totalMonthly}
        totalAnnual={totalAnnual}
        subscriptionsByCategory={subscriptionsByCategory}
      />

      {upcomingSubscriptions.length > 0 && (
        <div className="upcoming-section">
          <h2>Upcoming Charges (Next 7 Days)</h2>
          <div className="subscriptions-list">
            {upcomingSubscriptions.map((sub) => (
              <SubscriptionCard
                key={sub.id}
                subscription={sub}
                onEdit={handleEditSubscription}
                onDelete={handleDeleteSubscription}
                isUpcoming={true}
              />
            ))}
          </div>
        </div>
      )}

      <div className="all-subscriptions-section">
        <div className="section-header">
          <h2>All Active Subscriptions</h2>
          <button className="btn-add" onClick={handleAddSubscription}>
            + Add Subscription
          </button>
        </div>

        {activeSubscriptions.length === 0 ? (
          <div className="empty-state">
            <p>No subscriptions yet.</p>
            <button className="btn-add" onClick={handleAddSubscription}>
              Add your first subscription
            </button>
          </div>
        ) : (
          <div className="subscriptions-list">
            {activeSubscriptions.map((sub) => (
              <SubscriptionCard
                key={sub.id}
                subscription={sub}
                onEdit={handleEditSubscription}
                onDelete={handleDeleteSubscription}
                isUpcoming={upcomingSubscriptions.some((u) => u.id === sub.id)}
              />
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <SubscriptionForm
          subscription={editingSubscription}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <style>{`
        * {
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
        .dashboard {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .dashboard-header h1 {
          margin: 0;
          color: #333;
        }
        .btn-logout {
          padding: 0.75rem 1.5rem;
          background-color: #f44336;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }
        .btn-logout:hover {
          background-color: #da190b;
        }
        .error-message {
          background-color: #f8d7da;
          color: #721c24;
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 2rem;
        }
        .upcoming-section {
          margin-bottom: 3rem;
        }
        .upcoming-section h2 {
          color: #ff9800;
          margin-top: 0;
        }
        .all-subscriptions-section {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid #ddd;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .section-header h2 {
          margin: 0;
          color: #333;
        }
        .btn-add {
          padding: 0.75rem 1.5rem;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }
        .btn-add:hover {
          background-color: #45a049;
        }
        .empty-state {
          text-align: center;
          padding: 2rem;
          color: #999;
        }
        .empty-state p {
          margin: 0 0 1rem 0;
          font-size: 1.1rem;
        }
        .subscriptions-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-size: 1.5rem;
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default SubscriptionDashboard;
