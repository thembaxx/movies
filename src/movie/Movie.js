import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import styles from "./movie.module.css";

import { getSrcSet } from "../imageHelpers";

import Rating from "../common/Rating";
import Popup from "./Popup";

const skeleton = (
  <Skeleton
    variant="rectangular"
    animation="wave"
    className=""
    width="100%"
    height="100%"
  />
);

function Movie({ genres, movie, showInfo = true }) {
  const [imageContent, setImageContent] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const name = movie.title ? movie.title : movie.original_title;
  const imgUrl = movie.poster_path ? movie.poster_path : movie.backdrop_path;
  const srcSet = getSrcSet(imgUrl);

  let lazyImageObserver = new IntersectionObserver(function (
    entries,
    observer
  ) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImageObserver.unobserve(lazyImage);
      }
    });
  });

  useEffect(() => {
    if (imageRef.current) {
      lazyImageObserver.observe(imageRef.current);
    }
  }, [imageRef]);

  function onLoad() {
    setImageLoaded(true);
  }

  const { id, release_date: date, vote_average: vote } = movie;

  const year = date?.split("-")?.[0];

  let genre = genres?.map((genre) => genre?.name);
  genre = genre?.filter((c) => c);

  const content = (
    <Link to={`/movie/${name}-${id}`} className={`col ${styles.container}`}>
      <div>
        <div className={`${styles.imgContainer} shadow`}>
          <img
            ref={imageRef}
            style={{
              opacity: imageLoaded ? "1" : "0",
            }}
            className={`${styles.img}`}
            src={srcSet?.default}
            srcSet={srcSet?.set}
            onLoad={onLoad}
            loading="lazy"
            alt={name}
          />
          {imageLoaded && imageContent}
          {!imageLoaded && (
            <Skeleton
              variant="rectangular"
              animation="wave"
              className=""
              width="100%"
              height="100%"
            />
          )}

          <div className={`position-absolute top-0 end-0 me-4 mt-2`}>
            <Rating vote={vote * 10} />
          </div>
        </div>
        <div
          className={`mw-100 ${
            showInfo ? "d-flex" : "d-none"
          }  flex-column justify-content-center`}
          style={{ marginTop: 12 }}
        >
          <div className="text-truncate fs-6" style={{ fontWeight: 500 }}>
            {name}
          </div>
          <div style={{ fontSize: ".8rem", marginTop: 2 }}>
            <span className="d-flex align-items-center">
              <span className="opacity-75" style={{ marginRight: 6 }}>
                {year}
              </span>
              {genre && (
                <span className="text-truncate" style={{ marginRight: 6 }}>
                  · {genre.join(", ")}
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
