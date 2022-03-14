import React from 'react';
import styles from './aside.module.css';

import Reviews from './Reviews';

function Aside({ id }) {
  return (
    <div className={`${styles.container} h-100`}>
      <Reviews id={id} />
    </div>
  );
}

export default Aside;
