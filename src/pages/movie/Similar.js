import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './similar.module.css';

import { getSimilarMovies } from '../../tmdb/getData';
import { getSrcSet } from '../../imageHelpers';

function Similar({ id }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getData() {
      const similar = await getSimilarMovies(id);

      let items = [];
      if (similar.length > 6) {
        items = similar.slice(0, 6);
      } else {
        items = [...similar];
      }

      setMovies(items);
    }

    getData();

    return () => {
      setMovies([]);
    };
  }, [id]);

  return (
    <div className="container-fluid p-0">
      <h6>More like this</h6>
      <div className="row gy-4 pt-2 px-0 gx-2 row-cols-3 row-cols-md-6">
        {movies?.map((movie) => {
          const name = movie.title ? movie.title : movie.original_title;
          const imgUrl = movie.poster_path
            ? movie.poster_path
            : movie.backdrop_path;

          const srcSet = getSrcSet(imgUrl);

          return (
            <Link
              key={movie.id}
              to={`/movie/${name}-${movie.id}`}
              className={`col ${styles.container}`}
            >
              <div>
                <div className={`${styles.imgContainer}`}>
                  <img
                    className={`${styles.img}`}
                    src={srcSet?.default}
                    srcSet={srcSet?.set}
                    loading="lazy"
                    alt={name}
                  />
                </div>
                <div className={`text-truncate mt-2 me-1 ${styles.title}`}>
                  {name}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Similar;
