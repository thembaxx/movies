import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./similar.module.css";

import { getSimilarMovies } from "../../tmdb/getData";
import { getSrcSet } from "../../imageHelpers";

import Title from "./Title";
import Movie from "../../movie/Movie";
import Rating from "../../common/Rating";

function Similar({ id }) {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);

      const similar = await getSimilarMovies(id);

      let items = [];
      if (similar.length > 6) {
        items = similar.slice(0, 6);
      } else {
        items = [...similar];
      }

      setMovies(items);

      setIsLoading(false);
    }

    getData();

    return () => {
      setMovies([]);
    };
  }, [id]);

  return (
    <div className="container-fluid p-0">
      <Title name="More like this" loading={isLoading} />
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

                  {movie?.vote_average && (
                    <div className={`${styles.rating}`}>
                      <Rating vote={movie?.vote_average * 10} />
                    </div>
                  )}
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
