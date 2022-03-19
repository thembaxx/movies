import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./discover.module.css";

import { getPopularGenres, getGenres } from "../../tmdb/getData";
import { movieEndpoints } from "../../tmdb/data";

const tags = [
  movieEndpoints.recent,
  movieEndpoints.popular,
  movieEndpoints.trending,
  movieEndpoints.nowPlaying,
];

import Footer from "../../footer/Footer";
import Hero from "../hero/Hero";
import Carousel from "./Carousel";

function Discover({ genres, countries }) {
  const [navLinks, setNavLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRow, setIsLoadingRow] = useState(false);
  const index = useRef(-1);
  const links = useRef(null);
  let bottomBoundaryRef = useRef(null);

  function getGenre(code) {
    if (!code || !genres) return;
    const match = genres.find((genre) => genre.id == code);
    return match;
  }

  useEffect(() => {
    async function getData() {
      setIsLoading(true);

      const discovery = [movieEndpoints.recent];

      const genres = await getGenres();
      const res = await getPopularGenres(genres);

      if (res) discovery.push(...res);
      links.current = discovery;

      setIsLoading(false);
    }

    getData();

    return () => {
      links.current = null;
    };
  }, []);

  /******************** INFINITE SCROLL ******************************/
  var intersectionObserver = new IntersectionObserver(function (entries) {
    if (entries[0].intersectionRatio <= 0) return;

    if (!isLoadingRow) loadRow();
  });

  useEffect(() => {
    if (bottomBoundaryRef.current) {
      intersectionObserver.observe(bottomBoundaryRef.current);
    }

    return () => intersectionObserver.disconnect();
  }, [intersectionObserver, bottomBoundaryRef]);

  function loadRow() {
    index.current += 1;

    if (index.current < 0 || isNaN(index.current)) return;
    if (!links.current) return;
    if (index.current > links.current - 1);

    const link = links.current[index.current];
    if (!link) return;

    let nav = [...navLinks, link];
    setNavLinks(nav);

    if (index.current === links.current.length - 1) {
      intersectionObserver.unobserve(bottomBoundaryRef?.current);
    }
  }

  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ marginBottom: "48px" }}>
        <Hero genres={genres} getGenre={getGenre} />
      </div>
      <div className="container-fluid g-0 pb-4 pt-2">
        <div className="row row-cols-2 row-cols-sm-4 g-2 px-3 ">
          {tags.map((tag, i) => (
            <Link key={i} to={tag.getRoute()}>
              <div className={`col ${styles.tag} text-nowrap text-truncate`}>
                {tag.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-4 pb-4">
        {navLinks?.map((navLink, index) => (
          <div className="mb-4" key={index}>
            <Carousel
              name={navLink.name}
              fetchUrl={navLink.url}
              route={navLink.getRoute()}
              getGenre={getGenre}
              loading={(value) => setIsLoadingRow(value)}
            />
          </div>
        ))}
      </div>
      <div
        id="page-bottom-boundary"
        ref={bottomBoundaryRef}
        style={{ height: "20vh", width: "100%" }}
      ></div>
      <div
        className="px-3 py-4 mt-4"
        style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
      >
        <Footer />
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Discover;
