import React from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";

import tmdb from "../../assets/tmdb.svg";

function Home() {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.inner} align-items-md-center`}>
        <h1 className={`${styles.heading}`}>
          Discover movies <br /> anywhere. anytime.
        </h1>
        <Link to="/discover" className={`${styles.button}`}>
          Browse films
        </Link>
        <div className={`${styles.attribute}`}>
          <div className="me-2">Powered by</div>
          <img src={tmdb} />
        </div>
      </div>
    </div>
  );
}

export default Home;
