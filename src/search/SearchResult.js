import React from 'react';
import styles from './searchResult.module.css';

import { getSrcSet } from '../imageHelpers';

function SearchResult({ movie }) {
  const name = movie.title ? movie.title : movie.original_title;
  const imgUrl = movie.poster_path ? movie.poster_path : movie.backdrop_path;
  const srcSet = getSrcSet(imgUrl);

  const { release_date: date, vote_average: vote } = movie;
  const year = date?.split('-')?.[0];

  return (
    <div className={`p-1 ${styles.container}`}>
      <div className={`${styles.inner}`}>
        <div className={`${styles.imgContainer}`}>
          <img
            className={`${styles.img}`}
            src={srcSet?.default}
            srcSet={srcSet?.set}
            loading="lazy"
          />
        </div>
        <div>
          <h6 className={`${styles.title} text-truncate`}>{name}</h6>
          <span className={`${styles.meta}`}>
            <i className={`bi bi-star-fill ${styles.icon}`}></i>
            <span>{vote}</span>
            <span className="mx-2">·</span>
            <span>{year}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
