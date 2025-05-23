import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import './Watches.css'; // WatchCard also uses Watches.css for styling

function WatchCard({ watch, addToCart, toggleWishlist, wishlist, formatStars }) {
  const [isFlipped, setIsFlipped] = useState(false); // State to control the flip
  const navigate = useNavigate(); // For the "Buy Now" button

  // Calculate discounted price
  const discountedPrice = watch.discount > 0
    ? (watch.price - watch.price * watch.discount / 100).toFixed(2)
    : watch.price.toFixed(2);

  // Function to toggle the flip state
  const handleCardFlip = (e) => {
    // Prevent flipping when clicking on specific interactive elements inside the card
    // This allows buttons/links to work normally without triggering the flip
    if (e.target.closest('button') || e.target.closest('a')) {
      return;
    }
    setIsFlipped(!isFlipped);
  };

  return (
    // The main container for the 3D flip effect
    <div className={`watch-card-3d-container ${isFlipped ? 'flipped' : ''}`} onClick={handleCardFlip}>
      <div className="watch-card-inner">
        {/* Front Face of the Card */}
        <div className="watch-card-face watch-card-front">
          <Link to={`/catalog/${watch.id}`} className="watch-card-link">
            <img
              src={watch.image}
              alt={watch.name}
              className="watch-card-image"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/200x200/cccccc/000000?text=Image+NA"; }} // Fallback for broken images
            />
            <div className="watch-card-info">
              <h3 className="watch-card-name">{watch.name}</h3>
              <p className="watch-card-model">{watch.model}</p>
              <div className="watch-card-rating">
                <span className="watch-card-stars">{formatStars(watch.stars)}</span>
                <span className="watch-card-reviews">({watch.reviews} reviews)</span>
              </div>
              <p className="watch-card-price">
                {watch.discount > 0 && (
                  <span className="watch-card-original-price">₹{watch.price.toFixed(2)}</span>
                )}
                <span className="watch-card-current-price">₹{discountedPrice}</span>
                {watch.discount > 0 && (
                  <span className="watch-card-discount-tag">{watch.discount}% OFF</span>
                )}
              </p>
            </div>
          </Link>
          {/* Action buttons on the front face */}
          <div className="actions">
            <button onClick={() => addToCart(watch)}>Add to Cart</button>
            <button onClick={() => navigate(`/buy/${watch.id}`)}>Buy Now</button>
            <button
              className={`wishlist-btn ${wishlist.includes(watch.id) ? 'liked' : ''}`}
              onClick={() => toggleWishlist(watch.id)}
            >
              ♥
            </button>
          </div>
        </div>

        {/* Back Face of the Card */}
        <div className="watch-card-face watch-card-back">
          <h3 className="watch-card-name">{watch.name}</h3>
          <p className="watch-card-description">{watch.description}</p>
          <p><strong>Seller:</strong> {watch.seller}</p>
          <p><strong>Availability:</strong> {watch.inStock ? 'In Stock' : 'Out of Stock'}</p>
          {watch.emiOptions && <p><strong>EMI:</strong> {watch.emiOptions}</p>}
          {watch.coupon && <p><strong>Coupon:</strong> {watch.coupon}</p>}
          {watch.offers && watch.offers.length > 0 && (
            <p><strong>Offers:</strong> {watch.offers.join(', ')}</p>
          )}
          <button className="back-to-front-button" onClick={() => setIsFlipped(false)}>
            View Front
          </button>
          {/* You could add more action buttons here if needed */}
        </div>
      </div>
    </div>
  );
}

WatchCard.propTypes = {
  watch: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number,
    reviews: PropTypes.number,
    stars: PropTypes.number,
    image: PropTypes.string.isRequired,
    description: PropTypes.string,
    seller: PropTypes.string,
    inStock: PropTypes.bool,
    emiOptions: PropTypes.string,
    coupon: PropTypes.string,
    offers: PropTypes.arrayOf(PropTypes.string), // Assuming offers is an array of strings
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
  toggleWishlist: PropTypes.func.isRequired,
  wishlist: PropTypes.arrayOf(PropTypes.number).isRequired,
  formatStars: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired, // navigate is passed from Watches.jsx
};

export default WatchCard;