import React from "react";
import { Link } from "react-router-dom";

import styles from "./genre.module.css";

import { movieEndpoints } from "../../tmdb/data";

function Genre({ name, id }) {
  if (!name) return null;

  return (
    <Link to={movieEndpoints.genre.getRoute(id)} className={`${styles.genre}`}>
      {name}
    </Link>
  );
}

export default Genre;
