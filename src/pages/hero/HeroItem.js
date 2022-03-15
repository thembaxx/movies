import React from "react";
import { Link } from "react-router-dom";
import styles from "./heroItem.module.css";

import { getSrcSet } from "../../imageHelpers";

import Genre from "../common/Genre";

//"w92", "w154", "w185", "w342", "w500", "w780", or "original"
const gradient =
  "linear-gradient(180deg, rgba(3, 16, 39, 0) 0%, rgba(3, 16, 39, 0.8) 56.25%, #031027 100%)";

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
  const srcSet = getSrcSet(imgUrl);
  year = year?.split("-")?.[0];

  let genres;

  if (genresIds?.length > 3) {
    genres = genresIds.slice(0, 3).map((id) => getGenre(id));
  } else {
    genres = genresIds.map((id) => getGenre(id));
  }

  return (
    <div
      className="position-relative"
      style={{ height: "80vh", overflow: "hidden" }}
    >
      {/* Image */}

      <img
        className="img-fluid"
        src={srcSet?.default}
        srcSet={srcSet?.set}
        loading="lazy"
        alt={name}
      />

      <div
        className="container-fluid position-absolute bottom-0 p-3"
        style={{
          background: gradient,
        }}
      >
        <Link to={`/movie/${name}-${id}`} className="mb-">
          <h3 className={`text-truncate ${styles.title}`}>{name}</h3>
          <div className="mt-1 mt-md-2 mb-2">
            <span>{year}</span>
            <span className="mx-1">·</span>
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
