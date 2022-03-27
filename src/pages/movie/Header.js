import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import styles from "./header.module.css";

import { getSrcSet } from "../../imageHelpers";
import { timeConverter } from "../../helpers";
const gradient =
  "linear-gradient(180deg, rgba(1, 4, 9, 0) 0%, rgba(1, 4, 9, 0.39) 32.81%, rgba(1, 4, 9, 0.76) 66.67%, #010409 100%)";
const bgColor = "rgba(255, 255, 255, 0.15)";

function Header({
  movie,
  poster,
  backdrop,
  title,
  vote,
  year,
  runtime,
  voteCount,
}) {
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
          }}
          onLoad={(e) => {
            const image = e.target;
            if (image.complete && image.naturalHeight !== 0) {
              setBackdropLoaded(true);
              image.style.opacity = 1;
            }
          }}
          src={backdropSrcset?.default}
          srcSet={backdropSrcset?.set}
        />

        {!backdropLoaded && (
          <Skeleton
            sx={{ bgcolor: `${bgColor}` }}
            variant="rectangular"
            className={`${styles.skeleton}`}
            animation="wave"
            width="100%"
          />
        )}

        <div
          style={{
            background: gradient,
            position: "absolute",
            height: "100%",
            width: "100%",
            bottom: "0%",
            zIndex: "2",
          }}
        ></div>
      </div>

      <div className={`${styles.inner}`}>
        <div className={`${styles.meta}`}>
          <div className={`${styles.imgContainer} ms-4`}>
            <img
              className={`${styles.img}`}
              style={{
                opacity: 0,
              }}
              onLoad={(e) => {
                const image = e.target;
                if (image.complete && image.naturalHeight !== 0) {
                  setPosterLoaded(true);
                  image.style.opacity = 1;
                }
              }}
              src={posterSrcset?.default}
              srcSet={posterSrcset?.set}
            />

            {!posterLoaded && (
              <Skeleton
                sx={{ bgcolor: `${bgColor}` }}
                className={`${styles.imgSkeleton}`}
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
                  <div className="d-flex align-items-center">
                    <i className={`bi bi-star-fill ${styles.ratingIcon}`}></i>
                    <span>{vote}</span>
                  </div>
                )}
              </div>
            }
            {title && (
              <div className={`${styles.actions}`}>
                <div className="d-flex align-items-center">
                  {/* CERTIFICATION */}
                  <div className={`${styles.certification}`}>{"PG-13"}</div>

                  {/* IMDb */}
                  <div>
                    <a
                      href={`https://imdb.com/title/${movie?.imdb_id}`}
                      className={`${styles.imdb}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span style={{ marginRight: 4 }}>IMDb</span>
                      <i
                        className="bi bi-box-arrow-up-right"
                        style={{ fontSize: ".7rem" }}
                      ></i>
                    </a>
                  </div>
                </div>
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
