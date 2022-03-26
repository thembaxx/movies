import React, { useState, useEffect, useRef, useCallback } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./discover.module.css";

import { getPopularGenres, getGenres } from "../../tmdb/getData";
import { movieEndpoints } from "../../tmdb/data";

import Categories from "./Categories";
import Footer from "../../footer/Footer";
import Hero from "../hero/Hero";
import Carousel from "./Carousel";

function Discover({ genres }) {
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
  var intersectionObserver = new IntersectionObserver(
    function (entries) {
      if (entries[0].intersectionRatio <= 0) return;

      if (!isLoadingRow) loadRow();
    },
    {
      root: null,
      rootMargin: "200px 0px",
      threshold: 0,
    }
  );

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
    <div className={`${styles.container}`}>
      <div style={{ marginBottom: "16px" }}>
        <Hero genres={genres} getGenre={getGenre} />
      </div>
      <div className="container-fluid g-0 pb-2 pt-0">
        <Categories />
      </div>
      <div className="mt-4">
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
        style={{ height: "1px", width: "100%" }}
      ></div>
      <div
        className="px-3 py-0 mt-0"
        style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
      >
        <Footer />
      </div>

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

export default Discover;
