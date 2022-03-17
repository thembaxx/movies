import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import styles from "./movie.module.css";

import { getSrcSet } from "../imageHelpers";

import Rating from "../common/Rating";
import Popup from "./Popup";

const bgColor = "rgba(255, 255, 255, 0.08)";

function Movie({ genres, movie, loading, showInfo = true }) {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState(null);
  const [rating, setRating] = useState(null);
  const [releaseDate, setReleaseData] = useState(null);
  const [genre, setGenre] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef(null);

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
  }, [movie]);

  const handleObserver = useCallback(
    (entries, observer) => {
      const target = entries[0];
      if (target.isIntersecting) {
        const srcSet = getSrcSet(imgUrl);
        if (!srcSet) return;
        target.target.srcset = srcSet.set;
        target.target.src = srcSet.default;

        target.target.onload = (e) => {
          if (e.target.complete) setImageLoaded(true);
        };

        imageRef.current && observer.unobserve(imageRef.current);
      }
    },
    [imgUrl]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (imageRef.current) observer.observe(imageRef.current);
  }, [imageRef, handleObserver]);

  const content = (
    <Link to={`/movie/${title}-${id}`} className={`col ${styles.container}`}>
      <div>
        <div className={`${styles.imgContainer} shadow`}>
          <img
            ref={imageRef}
            style={{
              opacity: imageLoaded ? "1" : "0",
            }}
            className={`${styles.img}`}
            alt={title}
          />
          {!imageLoaded && (
            <Skeleton
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
              <span className={`${styles.date}`}>{releaseDate}</span>
              {genre && (
                <span className="text-truncate" style={{ marginRight: 6 }}>
                  · {genre.join(", ")}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );

  return content;
}

export default Movie;
