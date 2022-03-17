import React from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";

const img =
  "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

function Home() {
  return (
    <div className={`container-fluid vh-100 px-4 ${styles.container}`}>
      <div className={`${styles.imgContainer}`}>
        {/* <img loading='lazy' className={`${styles.img}`} src={img} /> */}
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
          <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" />
        </div>
      </div>
    </div>
  );
}

export default Home;
