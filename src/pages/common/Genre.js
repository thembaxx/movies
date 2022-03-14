import React from 'react';
import { Link } from 'react-router-dom';

import styles from './genre.module.css';

function Genre({ name }) {
  if (!name) return null;

  return (
    <Link to={`/genre/${name.toLowerCase()}`} className={`${styles.genre}`}>
      {name}
    </Link>
  );
}

export default Genre;
