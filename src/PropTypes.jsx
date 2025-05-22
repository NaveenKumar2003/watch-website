// PropTypes.jsx
import PropTypes from 'prop-types';

// Define prop-type shape for a single Watch object
export const WatchPropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  discount: PropTypes.number,
  gender: PropTypes.string,
  reviews: PropTypes.number,
  stars: PropTypes.number,
});

// Define prop-type for an array of Watch objects
export const WatchesArrayPropType = PropTypes.arrayOf(WatchPropType);

// Define prop-type for a function prop like a buy handler
export const HandleBuyPropType = PropTypes.func.isRequired;
