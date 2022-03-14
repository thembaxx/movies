import React from 'react';
import { Link } from 'react-router-dom';
import styles from './movie.module.css';

import { getSrcSet } from '../imageHelpers';

import Rating from '../common/Rating';
import Popup from './Popup';

function Movie({ genres, movie }) {
  const name = movie.title ? movie.title : movie.original_title;
  const imgUrl = movie.poster_path ? movie.poster_path : movie.backdrop_path;
  const srcSet = getSrcSet(imgUrl);

  const {
    id,
    release_date: date,
    vote_average: vote,
    overview,
    genre_ids: genresIds,
  } = movie;

  const year = date?.split('-')?.[0];

  let genre = genres?.map((genre) => genre?.name);
  genre = genre?.filter((c) => c);

  const content = (
    <Link to={`/movie/${name}-${id}`} className={`col ${styles.container}`}>
      <div>
        <div className={`${styles.imgContainer}`}>
          <img
            className={`${styles.img}`}
            src={srcSet?.default}
            srcSet={srcSet?.set}
            loading="lazy"
            alt={name}
          />
          <div className={`position-absolute top-0 end-0 me-4 mt-2`}>
            <Rating vote={vote * 10} />
          </div>
        </div>
        <div
          className="mw-100 d-flex flex-column justify-content-center"
          style={{ marginTop: 12 }}
        >
          <div className="text-truncate fs-6" style={{ fontWeight: 500 }}>
            {name}
          </div>
          <div style={{ fontSize: '.8rem', marginTop: 2 }}>
            <span className="d-flex align-items-center">
              <span className="opacity-75" style={{ marginRight: 6 }}>
                {year}
              </span>
              {genre && (
                <span className="text-truncate" style={{ marginRight: 6 }}>
                  · {genre.join(', ')}
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <Popup movie={movie} name={name} genre={genre} year={year}>
      {content}
    </Popup>
  );
}

export default Movie;
