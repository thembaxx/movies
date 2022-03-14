import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import {
  getGenreUrl,
  getDiscoverObj,
  getMovieDiscoverUrl,
  getSearchUrl,
} from '../tmdb/getData';
import axios from '../tmdb/axios';

import { capitalizeStr } from '../helpers';

import Movie from '../movie/Movie';
import Title from './common/Title';
import HeroItem from './hero/HeroItem';
import Filters from '../filters/Filters';

function Movies({ prop, getGenreCode, getGenre, genres, countries }) {
  let params = useParams();
  let location = useLocation();

  const [title, setTitle] = useState('Movies');
  const [movies, setMovies] = useState([]);
  const [hero, setHero] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [page, setPage] = useState(1);
  let bottomBoundaryRef = useRef(null);

  function loadHero(movie) {
    const title = movie.title ? movie.title : movie.original_title;
    const imgSrc = movie.backdrop_path;

    setHero(
      <HeroItem
        id={movie.id}
        name={title}
        imgUrl={imgSrc}
        year={movie.release_date}
        vote={movie.vote_average}
        overview={movie.overview}
        genresIds={movie.genre_ids}
        getGenre={getGenre}
      />
    );
  }

  function getFetchUrl(pageNum) {
    const pathname = location?.pathname;
    if (!pathname) return;

    let fetchUrl;

    if (pathname.startsWith('/genre')) {
      fetchUrl = getGenreUrl(getGenreCode(params[prop]), pageNum);
    } else if (pathname.startsWith('/discover')) {
      const navEl = getDiscoverObj(params[prop]);
      fetchUrl = navEl?.url;
    } else if (pathname.startsWith('/filter')) {
      const p = '/filter/';
      const query = pathname.slice(p.length - 1);
      fetchUrl = getMovieDiscoverUrl(query);
    } else if (pathname.startsWith('/search')) {
      const p = '/search/q=';
      const query = pathname.slice(p.length - 1);
      fetchUrl = getSearchUrl(query.split('%20').join(' '));
    }

    return fetchUrl;
  }

  async function getItems(pageNum) {
    if (pageNum !== 0 && responseData && pageNum + 1 > responseData.total_pages)
      return;

    setIsLoading(true);

    let fetchUrl = getFetchUrl(pageNum);
    if (!fetchUrl) return;

    const response = await axios.get(fetchUrl + `&page=${pageNum}`);

    if (!response || !response.data || !response.data.results) return;

    if (pageNum === 1 && location?.pathname !== '/discover') {
      const items = [...response.data.results];
      const removed = items.splice(0, 1);
      if (removed.length > 0) loadHero(removed[0]);
      setMovies(items);
    } else {
      setMovies([...movies, ...response.data.results]);
    }

    setResponseData({
      total_pages: response.data.total_pages,
      total_results: response.data.total_results,
    });

    setIsLoading(false);
  }

  useEffect(() => {
    async function getData() {
      await getItems(page);
    }

    getData();
  }, [page]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const pathname = location?.pathname;

    if (!pathname) return;

    if (pathname.startsWith('/genre')) {
      setTitle(`${capitalizeStr(params[prop])} Movies`);
    } else if (pathname.startsWith('/discover')) {
      const navEl = getDiscoverObj(params[prop]);
      setTitle(navEl?.name);
    } else if (pathname.startsWith('/filter')) {
      setTitle('Filter movies');
    } else if (pathname.startsWith('/search')) {
      const p = '/search/q=';
      const query = pathname.slice(p.length);
      setTitle(`Movies with “${query.split('%20').join(' ')}”`);
    }

    return () => {
      setMovies([]);
      setTitle('Movies');
      setHero(null);
      setIsLoading(false);
      setResponseData(null);
      setPage(1);
    };
  }, [location]);

  // INFINITE scrollTop
  const scrollObserver = useCallback((node) => {
    new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.intersectionRatio > 0) {
          if (!isLoading) setPage((num) => num + 1);
        }
      });
    }).observe(node);
  });

  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current);
    }
  }, [scrollObserver, bottomBoundaryRef]);

  return (
    <div style={{ paddingTop: 72 }}>
      {hero}
      <div className="m-3">
        <Filters genres={genres} countries={countries} />
      </div>
      <Title
        name={title}
        showExplore={false}
        canClick={false}
        isLoading={isLoading}
      />
      <div className="row gy-4 px-3 pb-5 gx-3 row-cols-2 row-cols-sm-4 row-cols-md-5 row-cols-lg-6">
        {movies?.map((movie, i) => {
          const genres = movie.genre_ids.map((code) => getGenre(code));
          return <Movie key={i} genres={genres} movie={movie} />;
        })}
      </div>
      <div
        id="page-bottom-boundary"
        ref={bottomBoundaryRef}
        style={{ height: 8, width: '100%' }}
      ></div>
    </div>
  );
}

export default Movies;
