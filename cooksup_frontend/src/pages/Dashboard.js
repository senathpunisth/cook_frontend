import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookingAPI, chefAPI, reviewAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  if (user?.user_type === 'chef') {
    return <ChefDashboard />;
  } else if (user?.user_type === 'client') {
    return <ClientDashboard />;
  }

  return <div>Loading dashboard...</div>;
};

const ChefDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, bookingsRes] = await Promise.all([
        chefAPI.getDashboardStats(),
        bookingAPI.getMyBookings()
      ]);
      setStats(statsRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard-container">
      <h1>Chef Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <span className="stat-label">Rating</span>
            <span className="stat-value">{stats?.rating?.toFixed(1) || 0}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-info">
            <span className="stat-label">Points</span>
            <span className="stat-value">{stats?.total_points || 0}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <span className="stat-label">Pending Bookings</span>
            <span className="stat-value">{stats?.pendingBookings || 0}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <span className="stat-label">Completed This Month</span>
            <span className="stat-value">{stats?.completedThisMonth || 0}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <span className="stat-label">Total Bookings</span>
            <span className="stat-value">{stats?.total_bookings || 0}</span>
          </div>
        </div>
      </div>

      <div className="bookings-section">
        <h2>Your Bookings</h2>
        {bookings.length === 0 ? (
          <p className="no-data">No bookings yet</p>
        ) : (
          <div className="bookings-table">
            <table>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Event Date</th>
                  <th>Location</th>
                  <th>Guests</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    <td>{booking.client_first_name} {booking.client_last_name}</td>
                    <td>{new Date(booking.event_date).toLocaleDateString()}</td>
                    <td>{booking.event_location}</td>
                    <td>{booking.num_guests}</td>
                    <td><span className={`status ${booking.status}`}>{booking.status}</span></td>
                    <td>
                      <a href={`/booking/${booking.id}`} className="link">View</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const ClientDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingAPI.getMyBookings();
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard-container">
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <p>You haven't booked any chefs yet</p>
          <a href="/chefs" className="btn-primary">Browse Chefs</a>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header">
                <h3>{booking.chef_first_name} {booking.chef_last_name}</h3>
                <span className={`status ${booking.status}`}>{booking.status}</span>
              </div>
              <div className="booking-details">
                <p><strong>Date:</strong> {new Date(booking.event_date).toLocaleDateString()} at {booking.event_time}</p>
                <p><strong>Location:</strong> {booking.event_location}</p>
                <p><strong>Guests:</strong> {booking.num_guests}</p>
                <p><strong>Budget:</strong> ${booking.budget}</p>
              </div>
              <a href={`/booking/${booking.id}`} className="view-link">View Details</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
