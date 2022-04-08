import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import styles from "./heroCarousel.module.css";

import HeroItem from "./HeroItem";

function HeroCarousel({ movies, genres }) {
  const [index, setIndex] = useState(0);

  function getGenre(code) {
    if (!code) return;
    return genres.find((genre) => genre.id == code);
  }

  useEffect(() => {
    return () => setIndex(0);
  }, []);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const items = movies?.map((movie) => {
    const title = movie.title ? movie.title : movie.original_title;
    const genre = movie.genre_ids
      .map((code) => getGenre(code))
      .filter((g) => g);
    const imgSrc = movie.backdrop_path
      ? movie.backdrop_path
      : movie.poster_path;

    return (
      <Carousel.Item key={movie.id}>
        <HeroItem
          id={movie.id}
          name={title}
          imgUrl={imgSrc}
          year={movie.release_date}
          vote={movie.vote_average}
          overview={movie.overview}
          genres={genre}
        />
      </Carousel.Item>
    );
  });

  const indicators = items.map((_, i) => {
    return (
      <button
        key={i}
        className={`${styles.indicatorButton}`}
        onClick={(e) => handleSelect(i, e)}
      >
        <div
          className={`${styles.indicator} ${
            i === index ? `${styles.active}` : ""
          }`}
        ></div>
      </button>
    );
  });

  return (
    <div className={`${styles.container}`}>
      <Carousel
        // fade
        activeIndex={index}
        onSelect={handleSelect}
        indicators={false}
        controls={false}
      >
        {items}
      </Carousel>
      <div className={`${styles.indicators}`}>{indicators}</div>
    </div>
  );
}

export default HeroCarousel;
