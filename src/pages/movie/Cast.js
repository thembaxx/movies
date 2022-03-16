import React, { useState, useEffect } from "react";
import styles from "./cast.module.css";

import { getMovieCredits } from "../../tmdb/getData";

import { getSrcSet } from "../../imageHelpers";

function Cast({ id }) {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  function getInitials(name) {
    if (!name) return;

    let arr = name.split(" ");
    if (arr.length === 1) {
      return arr[0][0];
    } else {
      let a = arr[0][0];
      let b = arr[arr.length - 1][0];
      return a + b;
    }
  }

  useEffect(() => {
    async function getData() {
      setIsLoading(true);

      const credits = await getMovieCredits(id);

      let items = [];
      if (credits?.cast?.length > 8) {
        items = credits?.cast?.slice(0, 8);
      } else {
        items = [...credits?.cast];
      }

      setCast(items);

      setIsLoading(false);
    }

    getData();

    return () => {
      setCast([]);
      setIsLoading(false);
    };
  }, [id]);

  return (
    <div className="container-fluid g-0">
      <div className="d-flex align-items-center justify-content-between mb-2 mt-4">
        <h6>Top Cast</h6>
        {/* SPINNER */}
        {isLoading && (
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
      <div className="row g-2 gy-2 pb-3 row-cols-1 row-cols-md-3 row-cols-lg-3">
        {cast?.map((person) => {
          const imgUrl = person.profile_path;
          const srcSet = getSrcSet(imgUrl);

          return (
            <div key={person.id} className={`col`}>
              <div className={`${styles.container}`}>
                <div className={`${styles.imgContainer}`}>
                  {!imageLoaded && (
                    <div className={`${styles.initials}`}>
                      {getInitials(person.name)}
                    </div>
                  )}
                  <img
                    style={{
                      opacity: imageLoaded ? "1" : "0",
                      display: imageLoaded ? "block" : "none",
                    }}
                    className={`${styles.img}`}
                    src={srcSet?.default}
                    srcSet={srcSet?.set}
                    loading="lazy"
                    alt={person.name}
                    onError={() => {
                      setImageLoaded(false);
                    }}
                    onLoad={(e) => {
                      const image = e.target;
                      if (image.complete && image.naturalHeight !== 0) {
                        setImageLoaded(true);
                      }
                    }}
                  />
                </div>
                <div className="ms-3 me-3 text-truncate">
                  <div className={`${styles.title}`}>{person.name}</div>
                  <span
                    className="me-3"
                    style={{ fontWeight: 400, opacity: 0.8 }}
                  >
                    as {person.character}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <span role="button" className="fs-6" style={{ fontWeight: 500 }}>
        See all cast <i className="bi bi-chevron-right fs-6"></i>
      </span>
    </div>
  );
}

export default Cast;
