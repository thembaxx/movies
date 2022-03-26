import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import styles from "./header.module.css";

import { getSrcSet } from "../../imageHelpers";
import { timeConverter } from "../../helpers";
const gradient =
  "linear-gradient(180deg, rgba(1, 4, 9, 0) 0%, rgba(1, 4, 9, 0.39) 32.81%, rgba(1, 4, 9, 0.76) 66.67%, #010409 100%)";
// const gradient =
//   "linear-gradient(180deg, rgba(1, 4, 9, 0) 0%, rgba(1, 4, 9, 0.29) 23.96%, rgba(1, 4, 9, 0.74) 61.98%, rgba(1, 4, 9, 0.94) 84.9%, #010409 100%)";
const bgColor = "rgba(255, 255, 255, 0.08)";

function Header({ poster, backdrop, title, vote, year, runtime, voteCount }) {
  const [posterSrcset, setPosterSrcset] = useState(null);
  const [backdropSrcset, setBackdropSrcset] = useState(null);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [backdropLoaded, setBackdropLoaded] = useState(false);

  useEffect(() => {
    const p_srcset = getSrcSet(poster);
    setPosterSrcset(p_srcset);

    const bd_srcset = getSrcSet(backdrop);
    setBackdropSrcset(bd_srcset);

    return () => {
      setPosterSrcset(null);
      setBackdropSrcset(null);
      setPosterLoaded(false);
      setBackdropLoaded(false);
    };
  }, [poster, backdrop]);

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.backdropContainer}`}>
        <img
          className={`${styles.backdrop}`}
          style={{
            opacity: 0,
            display: "none",
          }}
          onLoad={(e) => {
            const image = e.target;
            if (image.complete && image.naturalHeight !== 0) {
              setBackdropLoaded(true);
              image.style.display = "block";
              image.style.opacity = 1;
            }
          }}
          src={backdropSrcset?.default}
          srcSet={backdropSrcset?.set}
        />

        <div
          style={{
            background: gradient,
            position: "absolute",
            height: "100%",
            width: "100%",
            bottom: "0%",
            zIndex: "1",
          }}
        ></div>

        {!backdropLoaded && (
          <Skeleton
            sx={{ bgcolor: `${bgColor}` }}
            variant="rectangular"
            className={`${styles.skeleton}`}
            animation="wave"
            width="100%"
          />
        )}
      </div>

      <div className={`${styles.inner}`}>
        <div className={`${styles.meta}`}>
          {/* <div
            style={{
              background: gradient,
              position: "absolute",
              height: "100%",
              width: "100%",
              bottom: "5%",
              zIndex: "-1",
            }}
          ></div> */}
          <div className={`${styles.imgContainer} ms-4`}>
            <img
              className={`${styles.img}`}
              style={{
                opacity: 0,
                display: "none",
              }}
              onLoad={(e) => {
                const image = e.target;
                if (image.complete && image.naturalHeight !== 0) {
                  setPosterLoaded(true);
                  image.style.display = "block";
                  image.style.opacity = 1;
                }
              }}
              src={posterSrcset?.default}
              srcSet={posterSrcset?.set}
            />

            {!posterLoaded && (
              <Skeleton
                sx={{ bgcolor: `${bgColor}` }}
                variant="rectangular"
                animation="wave"
                width="100%"
                height="100%"
              />
            )}
          </div>
          <div className={`${styles.info}`}>
            {title && (
              <div className={`${styles.title} text-wrap`}>{title}</div>
            )}
            {
              <div className={`${styles.subtitle}`}>
                {year && <span>{year}</span>}
                {runtime && (
                  <div className={`${styles.runtime}`}>
                    {timeConverter(runtime)}
                  </div>
                )}
                {vote && (
                  <div>
                    <i className={`bi bi-star-fill ${styles.ratingIcon}`}></i>
                    <span>
                      {vote} {`(${voteCount?.toLocaleString()})`}
                    </span>
                  </div>
                )}
              </div>
            }
            {title && (
              <div className={`${styles.actions}`}>
                <div className={`${styles.button}`}>
                  <i className="bi bi-bookmark-plus"></i>
                </div>
                <div className={`${styles.button}`}>
                  <i className="bi bi-share"></i>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
