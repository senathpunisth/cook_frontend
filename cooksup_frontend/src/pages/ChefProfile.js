import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { chefAPI, reviewAPI, bookingAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './ChefProfile.css';

const ChefProfile = () => {
  const { chefId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [chef, setChef] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    fetchChefProfile();
  }, [chefId]);

  const fetchChefProfile = async () => {
    try {
      const response = await chefAPI.getChefProfile(chefId);
      setChef(response.data);
    } catch (error) {
      console.error('Error fetching chef profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setShowBookingForm(true);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!chef) return <div className="error">Chef not found</div>;

  return (
    <div className="chef-profile-container">
      <div className="profile-header">
        <div className="header-image">
          {chef.profile_image ? (
            <img src={chef.profile_image} alt={chef.first_name} />
          ) : (
            <div className="placeholder">👨‍🍳</div>
          )}
        </div>
        
        <div className="header-info">
          <h1>{chef.first_name} {chef.last_name}</h1>
          <p className="specialty">{chef.specialty}</p>
          <p className="location">📍 {chef.location}</p>
          
          <div className="stats">
            <div className="stat">
              <span className="label">Rating</span>
              <span className="value">{chef.rating.toFixed(1)} ⭐</span>
            </div>
            <div className="stat">
              <span className="label">Points</span>
              <span className="value">{chef.total_points}</span>
            </div>
            <div className="stat">
              <span className="label">Completed Bookings</span>
              <span className="value">{chef.total_bookings}</span>
            </div>
            <div className="stat">
              <span className="label">Reviews</span>
              <span className="value">{chef.total_reviews || 0}</span>
            </div>
          </div>

          {chef.availability_status === 'available' && (
            <button className="book-btn" onClick={handleBookClick}>
              Book Now
            </button>
          )}
        </div>
      </div>

      <div className="profile-content">
        <div className="left-column">
          <section className="about">
            <h2>About</h2>
            <p>{chef.about || chef.bio || 'No information provided'}</p>
          </section>

          <section className="details">
            <h2>Details</h2>
            <div className="detail-item">
              <span className="label">Experience</span>
              <span className="value">{chef.experience_years} years</span>
            </div>
            <div className="detail-item">
              <span className="label">Current Workplace</span>
              <span className="value">{chef.current_workplace || 'Independent'}</span>
            </div>
            <div className="detail-item">
              <span className="label">Specialty</span>
              <span className="value">{chef.specialty}</span>
            </div>
            {chef.certifications && (
              <div className="detail-item">
                <span className="label">Certifications</span>
                <span className="value">{chef.certifications}</span>
              </div>
            )}
          </section>

          {chef.photos && chef.photos.length > 0 && (
            <section className="gallery">
              <h2>Portfolio</h2>
              <div className="photos-grid">
                {chef.photos.map(photo => (
                  <div key={photo.id} className="photo-item">
                    <img src={photo.photo_url} alt={photo.title} />
                    {photo.title && <p className="photo-title">{photo.title}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="right-column">
          <section className="reviews">
            <h2>Recent Reviews</h2>
            {chef.recentReviews && chef.recentReviews.length > 0 ? (
              <div className="reviews-list">
                {chef.recentReviews.map(review => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <div className="reviewer">
                        {review.profile_image && (
                          <img src={review.profile_image} alt={review.first_name} className="reviewer-avatar" />
                        )}
                        <div>
                          <strong>{review.first_name} {review.last_name}</strong>
                          <p className="review-date">{new Date(review.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="rating">{'⭐'.repeat(review.rating)}</div>
                    </div>
                    <p className="review-text">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-reviews">No reviews yet</p>
            )}
          </section>
        </div>
      </div>

      {showBookingForm && (
        <BookingForm chefId={chefId} chefName={`${chef.first_name} ${chef.last_name}`} onClose={() => setShowBookingForm(false)} />
      )}
    </div>
  );
};

const BookingForm = ({ chefId, chefName, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventDate: '',
    eventTime: '',
    eventLocation: '',
    eventType: '',
    numGuests: '',
    menuRequirements: '',
    budget: '',
    specialRequests: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await bookingAPI.createBooking({
        chefId,
        ...formData,
        numGuests: parseInt(formData.numGuests),
        budget: parseFloat(formData.budget)
      });
      
      alert('Booking requested successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>Book {chefName}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Event Date</label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Event Time</label>
              <input
                type="time"
                name="eventTime"
                value={formData.eventTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Event Location</label>
            <input
              type="text"
              name="eventLocation"
              value={formData.eventLocation}
              onChange={handleChange}
              placeholder="Address"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Event Type</label>
              <input
                type="text"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                placeholder="Birthday, Wedding, etc."
              />
            </div>
            <div className="form-group">
              <label>Number of Guests</label>
              <input
                type="number"
                name="numGuests"
                value={formData.numGuests}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Budget</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              step="0.01"
              placeholder="$"
            />
          </div>

          <div className="form-group">
            <label>Menu Requirements</label>
            <textarea
              name="menuRequirements"
              value={formData.menuRequirements}
              onChange={handleChange}
              placeholder="Describe your menu preferences..."
            />
          </div>

          <div className="form-group">
            <label>Special Requests</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              placeholder="Any special requests or dietary restrictions?"
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Request Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChefProfile;
