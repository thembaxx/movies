import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import styles from "./heroItem.module.css";

import { getSrcSet } from "../../imageHelpers";
import { movieEndpoints } from "../../tmdb/data";

const gradient =
  "linear-gradient(180deg, rgba(1, 4, 9, 0) 0%, rgba(1, 4, 9, 0.39) 32.81%, rgba(1, 4, 9, 0.76) 66.67%, #010409 100%)";

function HeroItem({ id, imgUrl, name, year, overview, vote, genres }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const srcSet = getSrcSet(imgUrl);
  year = year?.split("-")?.[0];

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.backdropContainer}`}>
        <img
          onLoad={(e) => {
            const image = e.target;
            if (image.complete && image.naturalHeight !== 0) {
              setImageLoaded(true);
              image.style.display = "block";
            }
          }}
          src={srcSet?.default}
          srcSet={srcSet?.set}
          loading="lazy"
          style={{
            display: "none",
          }}
          className={`${styles.img}`}
          alt={name}
        />

        {!imageLoaded && (
          <Skeleton
            sx={{ bgcolor: `rgba(255, 255, 255, 0.15)` }}
            variant="rectangular"
            animation="wave"
            className={`${styles.skeleton}`}
          />
        )}

        <div
          style={{
            background: gradient,
            position: "absolute",
            height: "100%",
            width: "100vw",
            bottom: "0",
          }}
        ></div>
      </div>

      <div className="container-fluid position-absolute bottom-0 p-3">
        <Link to={`/movie/${name}-${id}`} className="mb-">
          <h3 className={`text-truncate ${styles.title}`}>{name}</h3>
          <div className="d-flex align-items-center">
            <span>{year}</span>
            <i className={`bi bi-star-fill ${styles.ratingIcon}`}></i>
            <span>{vote}</span>
          </div>
          <div className={`${styles.overview} d-none d-md-block fs-6 mt-2`}>
            {overview}
          </div>
        </Link>

        <div className="d-flex flex-wrap mt-1">
          {genres?.map((genre, i, arr) => (
            <div key={i} className={`${styles.genre}`}>
              <Link to={movieEndpoints.genre.getRoute(genre.id)}>
                <span
                  className={`${styles.genreTitle}`}
                >{`${genre?.name}`}</span>
                <span>{`${i !== arr.length - 1 ? ",  " : ""}`}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroItem;
