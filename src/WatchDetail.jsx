// src/components/WatchDetail.jsx

import React from 'react';
import PropTypes from 'prop-types';
import './WatchDetail.css'; // Import CSS for styling

function WatchDetail({ watch, onClose }) {
  if (!watch) return null; // If no watch is selected, return null

  return (
    <div className="watch-detail-overlay">
      <div className="watch-detail">
        <button onClick={onClose} className="close-button">Close</button>
        <img src={watch.image} alt={watch.name} className="watch-image" />
        <h2 className="watch-name">{watch.name}</h2>
        <p className="watch-model"><strong>Model:</strong> {watch.model}</p>
        <p className="watch-price"><strong>Price:</strong> ${watch.price.toFixed(2)}</p>
        <p className="watch-gender"><strong>Gender:</strong> {watch.gender}</p>
        <p className="watch-description"><strong>Description:</strong> {watch.description}</p>
        <p className="watch-delivery"><strong>Delivery:</strong> {watch.delivery}</p>
        <p className="watch-stock"><strong>In Stock:</strong> {watch.inStock ? "Yes" : "No"}</p>
        <p className="watch-seller"><strong>Seller:</strong> {watch.seller}</p>
        <p className="watch-emi"><strong>EMI Options:</strong> {watch.emiOptions}</p>
        <p className="watch-coupon"><strong>Coupon:</strong> {watch.coupon}</p>
        <p className="watch-protection"><strong>Protection Plan:</strong> {watch.protectionPlan}</p>
        <p className="watch-reviews"><strong>Reviews:</strong> {watch.reviews} (Rating: {watch.stars} stars)</p>
        <h3>Offers:</h3>
        <ul className="watch-offers">
          {watch.offers.map((offer, index) => (
            <li key={index}>{offer.type}: {offer.details}</li>
          ))}
        </ul>
        <button className="add-to-cart-button" onClick={() => onClose()}>Add to Cart</button>
      </div>
    </div>
  );
}

WatchDetail.propTypes = {
  watch: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default WatchDetail;
