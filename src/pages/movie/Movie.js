import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./movie.module.css";

import Header from "./Header";
import Cast from "./Cast";
import Details from "./Details";
import Similar from "./Similar";
import Aside from "./Aside";
import Genre from "../common/Genre";

import { getMovie } from "../../tmdb/getData";

function Movie({ prop }) {
  const [movie, setMovie] = useState();
  const [id, setId] = useState();
  const [certification, setCertification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    async function getData() {
      setIsLoading(true);

      window.scrollTo(0, 0);
      const arr = params[prop].split("-");
      const movieId = arr[arr.length - 1];

      if (!movieId) return;
      setId(movieId);

      const res = await getMovie(movieId);
      let releaseDates = res.release_dates?.results;

      let country = releaseDates.find((r) => r.iso_3166_1 === "US");
      if (!country && releaseDates.length > 0) country = releaseDates[0];

      if (country) {
        const countryDates = country.release_dates;
        if (countryDates && countryDates.length > 0) {
          const cert = countryDates[0].certification;
          setCertification(cert);
        }
      }
      setMovie(res);

      setIsLoading(false);
    }

    getData();

    return () => {
      setMovie(null);
      setId(null);
      setIsLoading(false);
    };
  }, [params]);

  const title = movie?.title ? movie?.title : movie?.original_title;
  const year = movie?.release_date?.split("-")?.[0];
  const overview = movie?.overview;
  const genres = movie?.genres;
  const backdropUrl = movie?.backdrop_path;
  const imgUrl = movie?.poster_path ? movie?.poster_path : movie?.backdrop_path;

  return (
    <div className="position-relative pb-0" style={{ paddingTop: 72 }}>
      {movie && (
        <Header
          poster={movie?.poster_path}
          backdrop={backdropUrl}
          title={title}
          vote={movie?.vote_average}
          year={year}
          runtime={movie?.runtime}
        />
      )}

      {movie && (
        <div className="row gx-0" style={{ marginTop: 24 }}>
          <div className="col mt-3 px-4 pb-4">
            <div className="row d-flex flex-column flex-md-row ">
              <div className="col col-md-6 mt-0">
                {movie?.tagline && (
                  <div className={`${styles.tagline}`}>
                    <div
                      style={{
                        fontWeight: 300,
                        color: "var(--orange)",
                        fontSize: ".875rem",
                        lineHeight: 1,
                      }}
                    >
                      <i className="bi bi-quote"></i>
                    </div>
                    <div>{movie?.tagline}</div>
                  </div>
                )}

                <div className="d-flex align-items-center mb-3">
                  {/* CERTIFICATION */}
                  {certification && (
                    <div className={`${styles.certification}`}>
                      {certification}
                    </div>
                  )}

                  {/* IMDb */}
                  <div>
                    <a
                      href={`https://www.imdb.com/title/${movie?.imdb_id}`}
                      className={`${styles.imdb}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span
                        style={{
                          fontWeight: 300,
                          color: "white",
                          marginRight: 4,
                          opacity: 0.87,
                        }}
                      >
                        visit on{" "}
                      </span>
                      <span
                        style={{ marginRight: 8 }}
                        className={`${styles.imdbText}`}
                      >
                        IMDb
                      </span>
                      <i
                        className="bi bi-box-arrow-up-right"
                        style={{ fontSize: ".75rem", marginBottom: 2 }}
                      ></i>
                    </a>
                  </div>
                </div>

                {/* OVERVIEW */}
                {overview && (
                  <p className="fs-6 text-wrap mt-0 lh-base">{overview}</p>
                )}

                {/* GENRES */}
                <div>
                  <div className="d-flex flex-wrap mt-3">
                    {genres?.map((genre) => (
                      <Genre key={genre.id} name={genre.name} id={genre.id} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <Cast id={id} />
            <hr />
            <Details movie={movie} />

            <hr />
            <Similar id={id} />
          </div>
          <div className="col-auto d-none d-lg-block position-sticky top-0">
            <Aside id={id} />
          </div>
        </div>
      )}

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Movie;
