import React from 'react';

import { getSrcSet } from '../../imageHelpers';

function Backdrop({ backdropUrl }) {
  const srcSet = getSrcSet(backdropUrl);

  return (
    <div
      className="position-fixed top-0"
      style={{
        zIndex: '-1',
        paddingTop: 72,
      }}
    >
      <img
        className={`image-fluid`}
        src={srcSet?.default}
        srcSet={srcSet?.set}
        loading="lazy"
      />
      <div
        className="position-absolute top-0 h-100 w-100"
        style={{
          background:
            'linear-gradient(180deg, rgba(3, 16, 39, 0.95) 0%, rgba(3, 16, 39, 0.95) 35.42%, #031027 100%)',
        }}
      ></div>
    </div>
  );
}

export default Backdrop;
