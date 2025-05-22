import React from 'react';
import { WatchesArrayPropType, HandleBuyPropType } from './PropTypes';
import WatchCard from './WatchCard';

function WatchesList({ watches, handleBuy }) {
  return (
    <div className="watch-list">
      {watches.map(watch => (
        <WatchCard
          key={watch.id}
          name={watch.name}
          price={watch.price}
          image={watch.image}
          onBuy={() => handleBuy(watch)}
        />
      ))}
    </div>
  );
}

WatchesList.propTypes = {
  watches: WatchesArrayPropType.isRequired,
  handleBuy: HandleBuyPropType,
};

export default WatchesList;
