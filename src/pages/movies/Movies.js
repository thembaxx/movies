import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";

import { getMovieEndpoint, constructQuery } from "../../tmdb/getData";
import { movieEndpoints } from "../../tmdb/data";
import { sortType } from "./filters/data";

import useFetch from "./useFectch";

import { capitalizeStr } from "../../helpers";

import Movie from "../../movie/Movie";
import Title from "../common/Title";
import Filters from "./filters/Filters";

function Movies({ prop, getGenre, genres, countries }) {
  const [title, setTitle] = useState("Movies");
  const [query, setQuery] = useState("");
  const [fetchUrl, setFetchUrl] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const { loading, error, list, pagingData } = useFetch(query, page);
  const loader = useRef(null);
  const params = useParams();
  const location = useLocation();

  /*******************FILTERS*********************/

  function applyFilters(filters) {
    setPage(1);
    setFilters(filters);
    const { genres, country, sort, years } = filters;
    const q = constructQuery("", genres, country, sort, years);
    setQuery(fetchUrl + q);
  }

  function setPageTitle(endpoint) {
    if (endpoint === movieEndpoints.search) {
      setTitle(`Movies with “${location?.search.slice(1)}”`);
    } else {
      setTitle(`${capitalizeStr(endpoint.name)}`);
    }
    // if (pathname.startsWith("/genre")) {
    //   setTitle(`${capitalizeStr(endpoint.name)}`);
    // } else if (pathname.startsWith("/discover")) {
    //   const navEl = getDiscoverObj(params[prop]);
    //   setTitle(navEl?.name);
    // } else if (pathname.startsWith("/filter")) {
    //   setTitle("Filter movies");
    // } else if (pathname.startsWith("/search")) {
    //   const p = "/search/q=";
    //   const query = pathname.slice(p.length);
    //   setTitle(`Movies with “${query.split("%20").join(" ")}”`);
    // }
  }

  function getEndpointObj(pathname) {
    if (pathname.startsWith("/movies")) {
      const parameter = params[prop];
      const q = parameter.split("?");
      const endpoint = getMovieEndpoint(q[0]);
      return endpoint;
    }
  }

  function updateFilters(endpoint) {
    if (!endpoint) return;

    const filterObj = Object.assign({}, filters);
    let sort;
    let genre = [];

    if (endpoint === movieEndpoints.recent) {
      sort = sortType.recent;
    } else if (endpoint === movieEndpoints.popular) {
      sort = sortType.popular;
    } else if (endpoint === movieEndpoints.topRated) {
      sort = sortType.rating;
    } else {
      sort = sortType.default;
    }

    let search = location?.search;
    if (search) {
      if (endpoint === movieEndpoints.genre) {
        const g = location?.search.slice(1);
        if (g) genre.push(g);
      }
    }

    filterObj.sort = sort;
    filterObj.genres = genre;
    setFilters(filterObj);
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    const pathname = location?.pathname;
    if (!pathname) return;

    const endpoint = getEndpointObj(pathname);
    if (!endpoint) return;
    setPageTitle(endpoint);
    updateFilters(endpoint);
    let url = endpoint?.url;

    if (endpoint === movieEndpoints.search) {
      let search = location?.search;

      if (search) {
        const q = location?.search.slice(1);
        url += q;
      }
    }

    setFetchUrl(url);

    setQuery(url);

    return () => {
      setQuery("");
      setTitle("Movies");
      setPage(1);
      setFetchUrl("");
    };
  }, [location, params]);

  /*******************INFINITE SCROLL*********************/

  const handleObserver = useCallback((entries, observer) => {
    const target = entries[0];
    if (target.isIntersecting) {
      if (pagingData && page + 1 > pagingData?.pages) {
        loader.current && observer.unobserve(loader.current);
      }
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "200px 0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <div style={{ paddingTop: 72 }}>
      <div className="m-3">
        <Filters
          genres={genres}
          countries={countries}
          apply={applyFilters}
          filters={filters}
        />
      </div>
      <Title
        name={title}
        showExplore={false}
        canClick={false}
        isLoading={loading}
      />
      <div className="row gy-4 px-3 pb-5 gx-3 row-cols-3 row-cols-sm-3 row-cols-md-5 row-cols-lg-6">
        {list?.map((movie, i) => {
          const genres = movie.genre_ids.map((code) => getGenre(code));
          return <Movie key={`movie_rx_${i}`} movie={movie} genres={genres} />;
        })}
      </div>
      {loading && <p className="mx-3">Loading...</p>}
      {error && <p className="mx-3">Error!</p>}
      <div ref={loader}></div>
    </div>
  );
}

export default Movies;
