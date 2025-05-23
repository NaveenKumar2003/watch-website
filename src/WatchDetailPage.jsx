// src/WatchDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './WatchDetailPage.css'; // New CSS file for styling

function WatchDetailPage({ watches, addToCart }) { // watches prop is now passed from App.js
  const { watchId } = useParams();
  const navigate = useNavigate();

  // State to manage the currently displayed main image
  const [mainImage, setMainImage] = useState('');

  const id = parseInt(watchId, 10);
  const watch = watches.find(w => w.id === id); // Use the watches prop

  // Set the default selected image when the component mounts or watch changes
  useEffect(() => {
    if (watch) {
      setMainImage(watch.image || watch.frontViewImage); // Default to primary image or front view
    }
  }, [watch]);

  const [quantity, setQuantity] = useState(1);

  if (!watch) {
    return (
      <div className="watch-detail-container not-found">
        <h2 className="detail-title">Watch not found!</h2>
        <p>The watch you are looking for might not exist or is unavailable.</p>
        <button
          onClick={() => navigate('/watches')}
          className="back-to-watches-button" // Using a class name
        >
          Back to Watches
        </button>
      </div>
    );
  }

  const handleQuantityChange = (delta) => {
    setQuantity(prev => {
      const newQty = prev + delta;
      return newQty < 1 ? 1 : newQty;
    });
  };

  const discountedPrice = watch.discount > 0
    ? (watch.price - watch.price * watch.discount / 100).toFixed(2)
    : watch.price.toFixed(2);

  // Format stars (re-using the logic from Watches.jsx)
  const formatStars = stars => {
    const fullStars = '★'.repeat(Math.floor(stars));
    const halfStar = stars % 1 ? '½' : '';
    const emptyStars = '☆'.repeat(5 - Math.ceil(stars));
    return fullStars + halfStar + emptyStars;
  };

  const handleAddToCart = () => {
    if (addToCart) {
      alert(`${watch.name} (Qty: ${quantity}) has been added to your cart!`);
      addToCart({ ...watch, quantity });
    } else {
      alert('Add to cart function is not implemented.');
    }
  };

  const handleBuyNow = () => {
    navigate(`/buy/${watch.id}`); // Navigate to the BuyNow page
  };

  // Array of all available image views for thumbnails
  const allImageViews = [
    { src: watch.image, alt: 'Default View' },
    { src: watch.topViewImage, alt: 'Top View' },
    { src: watch.frontViewImage, alt: 'Front View' },
    { src: watch.sideViewImage, alt: 'Side View' },
    { src: watch.detailViewImage, alt: 'Detail View' }
  ].filter(view => view.src); // Filter out any views that don't have an image URL

  return (
    <div className="watch-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      <div className="detail-content">
        <div className="image-gallery">
          <div className="thumbnail-strip">
            {allImageViews.map((view, index) => (
              <img
                key={index}
                src={view.src}
                alt={view.alt}
                className={`thumbnail ${mainImage === view.src ? 'active' : ''}`}
                onClick={() => setMainImage(view.src)}
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/60x60/cccccc/000000?text=NA"; }}
              />
            ))}
          </div>
          <div className="main-image-display">
            <img
              src={mainImage}
              alt={watch.name}
              className="main-detail-image"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x400/cccccc/000000?text=Image+Not+Found"; }}
            />
          </div>
        </div>

        <div className="product-info">
          <div className="detail-header"> {/* Moved header inside product-info */}
            <h1 className="detail-name">{watch.name}</h1>
            <span className="detail-model">Model: {watch.model}</span>
          </div>

          <div className="rating-section">
            <span className="detail-stars">{formatStars(watch.stars)}</span>
            <span className="detail-reviews">({watch.reviews} ratings)</span>
            <Link to="#" className="search-page-link">Search this page</Link>
          </div>

          <p className="detail-price">
            {watch.discount > 0 && (
              <span className="detail-original-price">₹{watch.price.toFixed(2)}</span>
            )}
            <span className="detail-current-price">₹{discountedPrice}</span>
            {watch.discount > 0 && (
              <span className="detail-discount-tag">{watch.discount}% OFF</span>
            )}
          </p>
          <p className="inclusive-taxes">Inclusive of all taxes</p>

          <div className="delivery-info">
            <p>FREE delivery <span className="delivery-date">{watch.delivery}</span>. <Link to="#" className="details-link">Details</Link></p>
            <p className="delivery-location">Delivering to Salem 636001 - <Link to="#" className="update-location-link">Update location</Link></p>
          </div>

          <div className="stock-info">
            {watch.inStock ? (
              <p className="in-stock">In stock</p>
            ) : (
              <p className="out-of-stock">Out of stock</p>
            )}
            {watch.reviews > 200 && <p className="bought-in-month">{watch.reviews}+ bought in past month</p>}
          </div>

          <div className="seller-info">
            <p>Ships from <span className="seller-source">Amazon</span></p>
            <p>Sold by <span className="seller-name">{watch.seller}</span></p>
            <p className="secure-transaction">Payment <i className="fas fa-lock"></i> Secure transaction</p>
          </div>

          {watch.emiOptions && (
            <div className="emi-options">
              <p>{watch.emiOptions}</p>
              <Link to="#" className="emi-details-link">EMI options</Link>
            </div>
          )}

          {watch.coupon && (
            <div className="coupon-section">
              <i className="fas fa-tag"></i>
              <span>{watch.coupon}</span> <Link to="#" className="terms-link">Terms</Link> | <Link to="#" className="shop-items-link">Shop items</Link>
            </div>
          )}

          {watch.protectionPlan && (
            <div className="protection-plan">
              <p>Add a Protection Plan:</p>
              <label>
                <input type="checkbox" />
                {watch.protectionPlan}
              </label>
            </div>
          )}

          <div className="quantity-control-detail">
            <label>Quantity:</label>
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>

          <div className="action-buttons-detail">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
            <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
          </div>

          <p className="add-gift-options">Add gift options</p>

          {watch.offers && watch.offers.length > 0 && (
            <div className="offers-section">
              <h3>Offers</h3>
              <div className="offer-grid">
                {watch.offers.map((offer, index) => (
                  <div key={index} className="offer-card">
                    <h4>{offer.type}</h4>
                    <p>{offer.details}</p>
                    <Link to="#" className="offer-link">1 offer &gt;</Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WatchDetailPage;