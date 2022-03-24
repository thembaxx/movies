import React from "react";
import { Link } from "react-router-dom";
import styles from "./categories.module.css";

import { movieEndpoints } from "../../tmdb/data";

const items = [
  movieEndpoints.recent,
  movieEndpoints.popular,
  movieEndpoints.trending,
  movieEndpoints.nowPlaying,
];

function Categories() {
  function getCategoryIcon(category) {
    //ticket-perforated-fill
    if (category === movieEndpoints.nowPlaying) {
      return <i className="bi bi-collection-play-fill"></i>;
    } else if (category === movieEndpoints.popular) {
      return <i className="bi bi-film"></i>;
    } else if (category === movieEndpoints.trending) {
      return <i className="bi bi-activity"></i>;
    } else if (category === movieEndpoints.recent) {
      return <i className="bi bi-clock"></i>;
    }
  }

  return (
    <div className="row row-cols-2 row-cols-sm-4 g-2 px-3 m-0">
      {items.map((category, i) => (
        <Link key={i} to={category.getRoute()}>
          <div className={`col ${styles.category}`}>
            <div className="fs-4 me-3">{getCategoryIcon(category)}</div>
            <div className="text-nowrap text-truncate">{category.name}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Categories;
