import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import styles from "./movie.module.css";

import { getSrcSet } from "../imageHelpers";

import Rating from "../common/Rating";
import Popup from "./Popup";

const bgColor = "rgba(255, 255, 255, 0.08)";

function Movie({ genres, movie, showInfo = true }) {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState(null);
  const [rating, setRating] = useState(null);
  const [releaseDate, setReleaseData] = useState(null);
  const [genre, setGenre] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [imgSrcSet, setImgSrcSet] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const {
      id,
      release_date,
      vote_average,
      title,
      original_title,
      poster_path,
    } = movie;

    setId(id);
    setTitle(title ? title : original_title);
    setReleaseData(release_date?.split("-")?.[0]);
    setRating(vote_average && vote_average);
    setGenre(genres?.map((genre) => genre?.name));
    setImgUrl(poster_path);

    return () => {
      setId(null);
      setTitle(null);
      setReleaseData(null);
      setRating(null);
      setGenre(null);
      setImgUrl(null);
      setImageLoaded(false);
      setImgSrcSet(null);
      containerRef.current = null;
    };
  }, [movie]);

  const handleObserver = useCallback(
    (entries, observer) => {
      const target = entries[0];
      if (target.isIntersecting || target.intersectionRatio > 0) {
        const srcSet = getSrcSet(imgUrl);
        if (!srcSet) return;

        setImgSrcSet(srcSet);
        containerRef.current && observer.unobserve(containerRef.current);
      }
    },
    [imgUrl, containerRef]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [containerRef, handleObserver]);

  const content = (
    <Link to={`/movie/${title}-${id}`} className={`col ${styles.container}`}>
      <div ref={containerRef}>
        <div className={`${styles.imgContainer} shadow`}>
          <img
            style={{
              opacity: 0,
            }}
            onLoad={(e) => {
              const image = e.target;
              if (image?.complete && image?.naturalHeight !== 0) {
                image.style.opacity = 1;
                setImageLoaded(true);
              }
            }}
            onError={(e) => {
              console.error(e);
            }}
            srcSet={imgSrcSet?.set}
            src={imgSrcSet?.default}
            className={`${styles.img}`}
            alt={title}
          />
          {!imageLoaded && (
            <Skeleton
              className={`${styles.skeleton}`}
              sx={{ bgcolor: `${bgColor}` }}
              variant="rectangular"
              animation="wave"
              width="100%"
              height="100%"
            />
          )}

          {rating && (
            <div className={`${styles.rating}`}>
              <Rating vote={rating * 10} />
            </div>
          )}
        </div>
        <div className={`${showInfo ? "d-flex" : "d-none"}  ${styles.info}`}>
          <div className={`text-truncate ${styles.title}`}>
            {!title ? (
              <Skeleton sx={{ bgcolor: `${bgColor}` }} animation="wave" />
            ) : (
              <span>{title}</span>
            )}
          </div>
          {!releaseDate ? (
            <Skeleton
              width="60%"
              sx={{ bgcolor: `${bgColor}` }}
              animation="wave"
            />
          ) : (
            <div className={`${styles.meta}`}>
              <span>{releaseDate}</span>
              <span style={{ margin: "0 6px" }}>·</span>
              {genre && (
                <span className="text-truncate" style={{ marginRight: 6 }}>
                  {genre.join(", ")}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );

  // return content;
  return (
    <Popup movie={movie} name={title} genre={genre} year={releaseDate}>
      {content}
    </Popup>
  );
}

export default Movie;
