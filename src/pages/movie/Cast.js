import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./cast.module.css";

import { getMovieCredits } from "../../tmdb/getData";
import { getSrcSet } from "../../imageHelpers";

import Title from "./Title";
import Property from "./Property";

function Cast({ id }) {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [directors, setDirectors] = useState([]);
  const [producers, setProducers] = useState([]);
  const [writers, setWriters] = useState([]);

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

  function generateList(arr) {
    if (!arr) return;

    return arr.map((c, i, arr) => (
      <span key={i}>
        <Link to={`/movies/person?${c.id}`} className={`${styles.link}`}>
          {c?.name}
        </Link>
        {i !== arr.length - 1 && <span>{", "}</span>}
      </span>
    ));
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

      setDirectors(
        credits?.crew?.filter(
          (d) =>
            (d.department == "Directing" && d.job == "Director") ||
            d.job == "Co-Director"
        )
      );

      setProducers(
        credits?.crew?.filter(
          (d) => d.department == "Production" && d.job == "Producer"
          // d.job == "Executive Producer" ||
          // d.job == "Co-Producer"
        )
      );

      setWriters(
        credits?.crew?.filter(
          (d) =>
            (d.department == "Writing" && d.job == "Screenplay") ||
            d.job == "Writer" ||
            d.job == "Story"
        )
      );

      setIsLoading(false);
    }

    getData();

    return () => {
      setCast([]);
      setIsLoading(false);
      setImageLoaded(false);
    };
  }, [id]);

  const direct = generateList(directors);
  const produce = generateList(producers);
  const write = generateList(writers);

  return (
    <div className="container-fluid g-0">
      <Title name="Cast and Crew" loading={isLoading} />

      <div className="mb-4">
        {directors && <Property title="Director" content={direct} />}
        {producers && <Property title="Producer" content={produce} />}
        {writers && <Property title="Writer" content={write} />}
      </div>
      <div className="row g-2 gy-2 pb-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
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
                      opacity: 0,
                    }}
                    className={`${styles.img}`}
                    onError={(e) => {
                      console.log("error ", e);
                      setImageLoaded(false);
                    }}
                    onLoad={(e) => {
                      const image = e.target;
                      if (image.complete && image.naturalHeight !== 0) {
                        image.style.opacity = 1;
                        setImageLoaded(true);
                      }
                    }}
                    src={srcSet?.default}
                    srcSet={srcSet?.set}
                    alt={person.name}
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
    </div>
  );
}

export default Cast;
