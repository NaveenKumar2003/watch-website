import React from 'react';
import PropTypes from 'prop-types';

function WatchCard({ name, price, image, onBuy }) {
  return (
    <div className="watch-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Price: ${price.toFixed(2)}</p>
      <button onClick={onBuy}>Buy Now</button>
    </div>
  );
}

// Prop validation: ensures you send correct prop types
WatchCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  onBuy: PropTypes.func.isRequired,
};

export default WatchCard;
