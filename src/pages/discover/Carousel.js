import React, { useEffect, useState, useRef } from "react";
import styles from "./carousel.module.css";

import axios from "../../tmdb/axios";

import Movie from "../../movie/Movie";
import Title from "../common/Title";
import Row from "../carousel/Carousel";

function Carousel({ name, fetchUrl, route, getGenre, loading }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      loading(true);
      setIsLoading(true);

      const response = await axios.get(fetchUrl);
      if (!response || !response.data || !response.data.results) return;

      const items = response.data.results.map((movie, i) => {
        const genres = movie.genre_ids.map((code) => getGenre(code));

        return (
          <Movie
            key={movie.id}
            showInfo={false}
            genres={genres}
            movie={movie}
          />
        );
      });

      setMovies(items);

      setIsLoading(false);
      loading(false);
    }

    getData();

    return () => {
      setIsLoading(false);
      setMovies([]);
    };
  }, []);

  return (
    <div className="container-fluid g-0 p-0 m-0">
      <div className={`${styles.header}`}>
        <Title name={name} route={route} isLoading={isLoading} />
      </div>

      <Row items={movies} />
    </div>
  );
}

export default Carousel;
