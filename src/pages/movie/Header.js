import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import styles from "./header.module.css";

import { getSrcSet } from "../../imageHelpers";
const gradient =
  "linear-gradient(180deg, rgba(1, 4, 9, 0) 0%, rgba(1, 4, 9, 0.8) 56.25%, #010409 100%)";

function Header({ poster, backdrop, title, vote, year, runtime }) {
  const [posterSrcset, setPosterSrcset] = useState(null);
  const [backdropSrcset, setBackdropSrcset] = useState(null);

  useEffect(() => {
    const p_srcset = getSrcSet(poster);
    setPosterSrcset(p_srcset);

    const bd_srcset = getSrcSet(backdrop);
    setBackdropSrcset(bd_srcset);

    return () => {
      setPosterSrcset(null);
      setBackdropSrcset(null);
    };
  }, [poster, poster]);

  return (
    <div className={`${styles.container}`}>
      <img
        className={`${styles.backdrop}`}
        src={backdropSrcset?.default}
        srcSet={backdropSrcset?.set}
      />

      {/* {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            animation="wave"
            className=""
            width="100%"
            height="100%"
          />
        )} */}

      <div
        className={`${styles.inner}`}
        style={{
          background: gradient,
        }}
      >
        <div className={`${styles.meta} ms-4`}>
          <div className={`${styles.imgContainer}`}>
            <img
              className={`${styles.img}`}
              src={posterSrcset?.default}
              srcSet={posterSrcset?.set}
            />
          </div>
          <div className={`${styles.info}`}>
            <div>
              <i className={`bi bi-star-fill ${styles.ratingIcon}`}></i>
              <span>{vote}</span>
            </div>
            <div className={`${styles.title} text-wrap`}>{title}</div>
            <div className={`${styles.subtitle}`}>
              <span>{year}</span>
              <div className={`${styles.runtime}`}>{runtime} min</div>
            </div>
            <div className={`${styles.actions}`}>
              <div className={`${styles.button}`}>
                <i className="bi bi-bookmark-plus"></i>
              </div>
              <div className={`${styles.button}`}>
                <i className="bi bi-share"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
