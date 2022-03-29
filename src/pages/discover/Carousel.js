import React, { useEffect, useState, useRef } from "react";
import styles from "./carousel.module.css";

import axios from "../../tmdb/axios";

import Movie from "../../movie/Movie";
import Title from "../common/Title";

function Carousel({ name, fetchUrl, route, getGenre, loading }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [transform, setTransform] = useState(0);
  let translateX = 0;
  const [navDots, setNavDots] = useState([]);
  const containeRef = useRef();
  const [nextEnabled, setNextEnabled] = useState(true);
  const [prevEnabled, setPrevEnabled] = useState(true);

  function getVW() {
    const width =
      window.innerWidth && document.documentElement.clientWidth
        ? Math.min(window.innerWidth, document.documentElement.clientWidth)
        : window.innerWidth ||
          document.documentElement.clientWidth ||
          document.getElementsByTagName("body")[0].clientWidth;

    return width;
  }

  function updateNavDots() {
    const width = getVW();
    const num = containeRef.current?.scrollWidth / width;
    if (isNaN(num)) {
      setNavDots([]);
      return;
    }

    if (num === 0) return;

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
    num <= 0 ? setPrevEnabled(false) : setPrevEnabled(true);
    num >= dots.length - 1 ? setNextEnabled(false) : setNextEnabled(true);
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
    if (containeRef.current) {
      updateNavDots();
    }
  }, [movies]);

  useEffect(() => {
    window.addEventListener("resize", windowSizeChanged);

    async function getData() {
      loading(true);
      setIsLoading(true);

      const response = await axios.get(fetchUrl);
      if (!response || !response.data || !response.data.results) return;

      setMovies(response.data.results);

      setIsLoading(false);
      loading(false);
    }

    getData();

    return () => window.removeEventListener("resize", windowSizeChanged);
  }, []);

  /******************** TOUCH EVENTS ****************************/
  let dragStarted = false;
  let oldClientX = 0;

  function handleTouchStart(e) {
    oldClientX = e.targetTouches[0].clientX;
  }

  function handleTouchMove(e) {
    dragStarted = true;
    translateX = 0;

    let touch = e.targetTouches[0];
    if (!touch) return;

    let change = touch.clientX - oldClientX;

    if (Math.abs(change) < 30) return;
    translateX = change;
  }

  function handleTouchEnd(e) {
    dragStarted = false;
    if (translateX === 0) return;
    if (translateX < 0) {
      scrollNext();
    } else {
      scrollPrevious();
    }
  }

  /******************** WIP ****************************/
  // const containerClass = `row flex-nowrap gy-0 p-0 m-0 pb-0 gx-3 row-cols-3 row-cols-sm-4 row-cols-md-6 ${styles.row8}`;
  // const containerClass = `row flex-nowrap gy-0 p-0 m-0 pb-0 gx-1 row-cols-3 row-cols-sm-4 row-cols-md-6`;
  const containerClass = `row flex-nowrap row-cols-3 row-cols-sm-4 row-cols-md-6 me-0 p-0 gx-3 px-3`;

  return (
    <div className="container-fluid g-0 p-0 m-0">
      <div className={`${styles.header}`}>
        <Title name={name} route={route} isLoading={isLoading} />
        {!isLoading && (
          <div className={`${styles.navDots}`}>
            {navDots?.map((dot, index) => {
              return (
                <div
                  key={`dot_${index}`}
                  className={`${styles.dot} border ${
                    dot ? `${styles.dotActive}` : ""
                  }`}
                ></div>
              );
            })}
          </div>
        )}
      </div>

      <div className={`${styles.container}`}>
        <div
          className={`${containerClass} ${styles.carousel}`}
          ref={containeRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {movies.map((movie, i) => {
            const genres = movie.genre_ids.map((code) => getGenre(code));

            return (
              <div key={`${movie.id}_${i}`} className="col">
                <Movie
                  key={movie.id}
                  showInfo={false}
                  genres={genres}
                  movie={movie}
                />
              </div>
            );
          })}
        </div>

        {prevEnabled && (
          <div
            className={`${styles.button} ${styles.prev}`}
            onClick={scrollPrevious}
          >
            <i className="bi bi-arrow-left-short fs-6"></i>
          </div>
        )}
        {nextEnabled && (
          <div
            className={`${styles.button} ${styles.next}`}
            onClick={scrollNext}
          >
            <i className="bi bi-arrow-right-short fw-bolder fs-6"></i>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carousel;
