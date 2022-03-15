import React, { useEffect, useState, useRef } from 'react';
import styles from './carousel.module.css';

import axios from '../../tmdb/axios';

import Movie from '../../movie/Movie';
import Title from '../common/Title';

function Carousel({ name, fetchUrl, route, getGenre }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [transform, setTransform] = useState(0);
  const [navDots, setNavDots] = useState([]);
  const containeRef = useRef();

  function getVW() {
    return window.innerWidth && document.documentElement.clientWidth
      ? Math.min(window.innerWidth, document.documentElement.clientWidth)
      : window.innerWidth ||
          document.documentElement.clientWidth ||
          document.getElementsByTagName('body')[0].clientWidth;
  }

  function updateNavDots() {
    const width = getVW();
    const num = containeRef.current?.scrollWidth / width;
    if (isNaN(num)) {
      setNavDots([]);
      return;
    }

if(num === 0) return;

    let arr = Array(Math.round(num)).fill(false);
    if (arr.length > 0) arr[0] = true;
    setNavDots(arr);
  }

  function updateActiveNavDot() {
    if (navDots?.length === 0) return;

    let dots = [...navDots];
    dots = dots?.map((_) => false);

    const num = Math.abs(transform / getVW());

    if (isNaN(num)) return;

    dots[num] = true;
    setNavDots(dots);
  }

  function scrollNext() {
    const width = getVW();

    if (Math.abs(transform - width) >= containeRef.current?.scrollWidth) return;
    setTransform((t) => t - width);
  }

  function scrollPrevious() {
    const width = getVW();

    if (transform >= 0) {
      setTransform(0);
      return;
    }
    setTransform((t) => t + width);
  }

  function windowSizeChanged() {
    setTransform(0);
    updateNavDots();
  }

  useEffect(() => {
    if (containeRef.current) {
      containeRef.current.style.transform = `translateX(${transform}px)`;

      updateActiveNavDot();
    }
  }, [transform]);

  useEffect(() => {
    window.addEventListener('resize', windowSizeChanged);

    async function getData() {
      setIsLoading(true);

      const response = await axios.get(fetchUrl);
      if (!response || !response.data || !response.data.results) return;

      // if (response.data.results.length > 12) {
      //   setMovies(response.data.results.slice(0, 12));
      // } else {
      //   setMovies(response.data.results);
      // }

      setMovies(response.data.results);

      setIsLoading(false);
    }

    getData();

    return () => window.removeEventListener('resize', windowSizeChanged);
  }, []);

  useEffect(() => {
    if (containeRef.current) {
      updateNavDots();
    }
  }, [movies]);

  /******************** WIP ****************************/
  const containerClass =
    'row flex-nowrap gy-0 p-0 m-0 pb-0 gx-3 row-cols-3 row-cols-sm-4 row-cols-md-5 row-cols-lg-6';

  return (
    <div className="container-fluid p-0 g-0">
      <div className={`${styles.header}`}>
        <Title name={name} route={route} isLoading={isLoading} />
        <div className={`${styles.navDots}`}>
          {navDots?.map((dot, index) => {
            return (
              <div
                key={`dot_${index}`}
                className={`${styles.dot} border ${
                  dot ? `${styles.dotActive}` : ''
                }`}
              ></div>
            );
          })}
        </div>
      </div>

      <div className={`${styles.container} overflow-hidden position-relative`}>
        <div
          className={`${containerClass} ${styles.carousel}`}
          ref={containeRef}
        >
          {movies.map((movie) => {
            const genres = movie.genre_ids.map((code) => getGenre(code));

            return <Movie key={movie.id} genres={genres} movie={movie} />;
          })}
        </div>

        <div
          className={`${styles.button} ${styles.prev}`}
          onClick={scrollPrevious}
        >
          <i className="bi bi-chevron-left fs-6"></i>
        </div>
        <div className={`${styles.button} ${styles.next}`} onClick={scrollNext}>
          <i className="bi bi-chevron-right fs-6"></i>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
