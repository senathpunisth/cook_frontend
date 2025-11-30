import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { chefAPI } from '../services/api';
import './ChefSearch.css';

const ChefSearch = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    specialty: '',
    minRating: '',
    sortBy: 'rating'
  });

  useEffect(() => {
    fetchChefs();
  }, [filters]);

  const fetchChefs = async () => {
    setLoading(true);
    try {
      const response = await chefAPI.searchChefs(filters);
      setChefs(response.data);
    } catch (error) {
      console.error('Error fetching chefs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.round(rating));
  };

  return (
    <div className="chef-search-container">
      <div className="search-header">
        <h1>Find Your Perfect Chef</h1>
        <p>Browse and book talented chefs for your event</p>
      </div>

      <div className="search-filters">
        <div className="filter-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            placeholder="e.g., New York, NY"
          />
        </div>

        <div className="filter-group">
          <label>Specialty</label>
          <input
            type="text"
            name="specialty"
            value={filters.specialty}
            onChange={handleFilterChange}
            placeholder="e.g., Italian, Asian"
          />
        </div>

        <div className="filter-group">
          <label>Minimum Rating</label>
          <select name="minRating" value={filters.minRating} onChange={handleFilterChange}>
            <option value="">Any Rating</option>
            <option value="3">3+ Stars</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort By</label>
          <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
            <option value="rating">Highest Rated</option>
            <option value="points">Most Points</option>
          </select>
        </div>
      </div>

      {loading && <div className="loading">Loading chefs...</div>}

      <div className="chefs-grid">
        {chefs.length === 0 ? (
          <div className="no-results">No chefs found. Try adjusting your filters.</div>
        ) : (
          chefs.map(chef => (
            <div key={chef.id} className="chef-card">
              <div className="chef-image">
                {chef.profile_image ? (
                  <img src={chef.profile_image} alt={chef.first_name} />
                ) : (
                  <div className="placeholder-image">👨‍🍳</div>
                )}
              </div>
              <div className="chef-info">
                <h3>{chef.first_name} {chef.last_name}</h3>
                <p className="specialty">{chef.specialty || 'Chef'}</p>
                <p className="location">📍 {chef.location}</p>
                <p className="workplace">{chef.current_workplace}</p>
                
                <div className="chef-stats">
                  <div className="stat">
                    <span className="stat-label">Rating</span>
                    <span className="stat-value">
                      {chef.rating.toFixed(1)} {renderStars(chef.rating)}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Points</span>
                    <span className="stat-value">{chef.total_points}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Bookings</span>
                    <span className="stat-value">{chef.total_bookings}</span>
                  </div>
                </div>

                <p className="bio">{chef.bio}</p>

                <Link to={`/chef/${chef.id}`} className="view-profile-btn">
                  View Profile
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChefSearch;
