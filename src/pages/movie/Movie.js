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
import { getSrcSet } from "../../imageHelpers";

function Movie({ prop }) {
  const [movie, setMovie] = useState();
  const [id, setId] = useState();
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

      setMovie(await getMovie(movieId));

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
  const srcSet = getSrcSet(imgUrl);

  return (
    <div className="position-relative pb-0" style={{ paddingTop: 72 }}>
      <Header
        poster={movie?.poster_path}
        backdrop={backdropUrl}
        title={title}
        vote={movie?.vote_average}
        year={year}
        runtime={movie?.runtime}
      />

      {movie && (
        <div className="row gx-0 mt-5">
          <div className="col mt-3 px-4 pb-4">
            <div className="row d-flex flex-column flex-md-row ">
              <div className="col col-md-6 mt-0">
                <div className={`${styles.tagline}`}>“{movie?.tagline}”</div>

                {/* OVERVIEW */}
                <p className="fs-6 text-wrap mt-0 lh-base">{overview}</p>

                {/* GENRES */}
                <div>
                  <div className="d-flex flex-wrap mt-3">
                    {genres?.map((genre) => (
                      <Genre key={genre.id} name={genre.name} />
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
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Movie;
