import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Connect with Professional Chefs</h1>
          <p>Find talented chefs for your events, parties, and special occasions</p>
          <div className="hero-buttons">
            <Link to="/chefs" className="btn btn-primary">
              Browse Chefs
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Become a Chef
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-header">
          <h2>Why Choose CookSup?</h2>
          <p>Everything you need to find and book the perfect chef</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Easy Search</h3>
            <p>Find chefs by location, specialty, and ratings. Filter by your preferences and budget.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Verified Ratings</h3>
            <p>Real reviews and ratings from verified clients help you make informed decisions.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Direct Communication</h3>
            <p>Message chefs directly to discuss your event details, menu, and requirements.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📸</div>
            <h3>Portfolio</h3>
            <p>View chef portfolios with photos of their previous dishes and events.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Points System</h3>
            <p>Top-rated chefs earn points and appear higher in search results.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Safe & Secure</h3>
            <p>Verified chefs and secure booking system for your peace of mind.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
        </div>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Browse & Search</h3>
            <p>Search for chefs by location, specialty, and ratings</p>
          </div>

          <div className="arrow">→</div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>View Profiles</h3>
            <p>Check portfolios, reviews, and ratings</p>
          </div>

          <div className="arrow">→</div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>Book Service</h3>
            <p>Schedule and confirm your booking</p>
          </div>

          <div className="arrow">→</div>

          <div className="step">
            <div className="step-number">4</div>
            <h3>Enjoy Event</h3>
            <p>Have your event and leave a review</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="section-header">
          <h2>What Our Users Say</h2>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"CookSup made it so easy to find a chef for my daughter's birthday. Chef Marcus was amazing!"</p>
            <div className="testimonial-author">
              <div className="author-avatar">👩</div>
              <div>
                <strong>Sarah Johnson</strong>
                <p>New York, NY</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"As a chef, CookSup has helped me build my independent business. Great platform!"</p>
            <div className="testimonial-author">
              <div className="author-avatar">👨‍🍳</div>
              <div>
                <strong>James Chen</strong>
                <p>San Francisco, CA</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"Professional chefs, fair prices, and excellent customer service. Highly recommend!"</p>
            <div className="testimonial-author">
              <div className="author-avatar">👩‍💼</div>
              <div>
                <strong>Emily Rodriguez</strong>
                <p>Los Angeles, CA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Find Your Perfect Chef?</h2>
        <p>Join thousands of satisfied clients and professional chefs on CookSup</p>
        <div className="cta-buttons">
          <Link to="/chefs" className="btn btn-primary btn-large">
            Browse Chefs Now
          </Link>
          <Link to="/register" className="btn btn-secondary btn-large">
            Register as a Chef
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
