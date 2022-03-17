import React, { useState, useEffect, useRef, useCallback } from "react";

import { getDiscoveryNav } from "../../tmdb/getData";

import Footer from "../../footer/Footer";
import Hero from "../hero/Hero";
import Carousel from "./Carousel";

function Discover({ genres, countries }) {
  const [navLinks, setNavLinks] = useState([]);
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
    if (!genres) return;

    const popularGenres = [
      "adventure",
      "action",
      "science fiction",
      "drama",
      "comedy",
      "thriller",
      "horror",
      "romantic",
      "documentary",
    ];

    let genreMatches = [];
    popularGenres.forEach((genre) => {
      const match = genres?.find(
        (g) => g.name.toLowerCase() === genre.toLowerCase()
      );

      if (match) genreMatches.push(match);
    });

    const discovery = getDiscoveryNav(genreMatches);
    links.current = discovery;
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
      <div className="mt-4 pb-4">
        {navLinks?.map((navLink, index) => (
          <div className="mb-5" key={index}>
            <Carousel
              name={navLink.name}
              fetchUrl={navLink.url}
              route={navLink.route}
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
    </div>
  );
}

export default Discover;
