import React from 'react';
import styles from './movie.module.css';

function Property({title, content}) {
  return (
    <div className={`${styles.container}`}>
      <span className={`${styles.heading}`}>{title}</span>
      <span>{content}</span>
    </div>
  );
}

export default Property;
