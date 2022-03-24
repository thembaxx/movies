import React from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";

import tmdb from "../../assets/tmdb.svg";

const img =
  "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

function Home() {
  return (
    <div className={`container-fluid px-4 ${styles.container}`}>
      <div className={`${styles.imgContainer}`}>
        {/* <img loading="lazy" className={`${styles.img}`} src={img} /> */}
        <div className={`${styles.imgOverlay}`}></div>
      </div>
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
