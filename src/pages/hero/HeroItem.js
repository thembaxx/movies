import React, { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import styles from "./heroItem.module.css";

import { getSrcSet } from "../../imageHelpers";

import Genre from "../common/Genre";

//"w92", "w154", "w185", "w342", "w500", "w780", or "original"
// const gradient =
//   "linear-gradient(180deg, rgba(3, 16, 39, 0) 0%, rgba(3, 16, 39, 0.8) 56.25%, #031027 100%)";
const gradient =
  "linear-gradient(180deg, rgba(1, 4, 9, 0) 0%, rgba(1, 4, 9, 0.8) 56.25%, #010409 100%)";

function HeroItem({
  id,
  imgUrl,
  name,
  year,
  overview,
  vote,
  genresIds,
  getGenre,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const srcSet = getSrcSet(imgUrl);
  year = year?.split("-")?.[0];

  let genres;

  if (genresIds?.length > 3) {
    genres = genresIds.slice(0, 3).map((id) => getGenre(id));
  } else {
    genres = genresIds.map((id) => getGenre(id));
  }

  return (
    <div className={`${styles.container}`}>
      <img
        src={srcSet?.default}
        srcSet={srcSet?.set}
        style={{
          display: "none",
        }}
        className={`${styles.img} img-fluid`}
        onLoad={(e) => {
          const image = e.target;
          if (image.complete && image.naturalHeight !== 0) {
            setImageLoaded(true);
            image.style.display = "block";
          }
        }}
        loading="lazy"
        alt={name}
      />

      {!imageLoaded && (
        <Skeleton
          sx={{ bgcolor: `rgba(255, 255, 255, 0.08)` }}
          variant="rectangular"
          animation="wave"
          width="100%"
          height="100%"
        />
      )}

      <div
        className="container-fluid position-absolute bottom-0 p-3"
        style={{
          background: gradient,
        }}
      >
        <Link to={`/movie/${name}-${id}`} className="mb-">
          <h3 className={`text-truncate ${styles.title}`}>{name}</h3>
          <div className="mt-1 mt-md-2 mb-2 d-flex align-items-center">
            <span>{year}</span>
            <i className={`bi bi-star-fill ${styles.ratingIcon}`}></i>
            <span>{vote}</span>
          </div>
          <div className={`${styles.overview} d-none d-md-block fs-6`}>
            {overview}
          </div>
        </Link>

        {/* Genres */}
        <div className="d-flex flex-wrap mt-2">
          {genres?.map((genre, i) => (
            <Genre key={i} name={genre?.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroItem;
