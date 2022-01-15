import './index.scss';
import React from 'react';

const Tile = ({
  show,
  direction
}) => {
  return (
    <div>
      {show ?
        <div className={`tile tile-full tile-full-facing-${direction.toLowerCase()}`} />
        : <div className="tile" />
      }
    </div>
  );
};

export default Tile;

