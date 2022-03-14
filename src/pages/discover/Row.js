import React, { useEffect, useState } from 'react';

import axios from '../../tmdb/axios';

import Movie from '../../movie/Movie';
import Title from '../common/Title';

function Row({ name, fetchUrl, route, getGenre }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);

      const response = await axios.get(fetchUrl);
      if (!response || !response.data || !response.data.results) return;

      if (response.data.results.length > 12) {
        setMovies(response.data.results.slice(0, 12));
      } else {
        setMovies(response.data.results);
      }

      setIsLoading(false);
    }

    getData();
  }, []);

  return (
    <div className="container-fluid p-0 pb-2">
      <Title name={name} route={route} isLoading={isLoading} />

      <div className="row gy-4 px-3 pb-4 gx-3 row-cols-2 row-cols-sm-4 row-cols-md-5 row-cols-lg-6">
        {movies.map((movie) => {
          const genres = movie.genre_ids.map((code) => getGenre(code));

          return <Movie key={movie.id} genres={genres} movie={movie} />;
        })}
      </div>
    </div>
  );
}

export default Row;
