import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";

import {
  getGenreUrl,
  getDiscoverObj,
  getMovieDiscoverUrl,
  getSearchUrl,
} from "../../tmdb/getData";

import axios from "../../tmdb/axios";
import useFetch from "./useFectch";

import { capitalizeStr } from "../../helpers";

import Movie from "../../movie/Movie";
import Title from "../common/Title";
import Filters from "../../filters/Filters";

function Movies({ prop, getGenreCode, getGenre, genres, countries }) {
  const [title, setTitle] = useState("Movies");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { loading, error, list, pagingData } = useFetch(query, page);
  const loader = useRef(null);
  const params = useParams();
  const location = useLocation();

  function setPageTitle(pathname) {
    if (pathname.startsWith("/genre")) {
      setTitle(`${capitalizeStr(params[prop])} Movies`);
    } else if (pathname.startsWith("/discover")) {
      const navEl = getDiscoverObj(params[prop]);
      setTitle(navEl?.name);
    } else if (pathname.startsWith("/filter")) {
      setTitle("Filter movies");
    } else if (pathname.startsWith("/search")) {
      const p = "/search/q=";
      const query = pathname.slice(p.length);
      setTitle(`Movies with “${query.split("%20").join(" ")}”`);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const pathname = location?.pathname;
    if (!pathname) return;

    setPageTitle(pathname);

    let fetchUrl;

    if (pathname.startsWith("/genre")) {
      fetchUrl = getGenreUrl(getGenreCode(params[prop]), page);
    } else if (pathname.startsWith("/discover")) {
      const navEl = getDiscoverObj(params[prop]);
      fetchUrl = navEl?.url;
    } else if (pathname.startsWith("/filter")) {
      const p = "/filter/";
      const query = pathname.slice(p.length - 1);
      fetchUrl = getMovieDiscoverUrl(query);
    } else if (pathname.startsWith("/search")) {
      const p = "/search/q=";
      const query = pathname.slice(p.length - 1);
      fetchUrl = getSearchUrl(query.split("%20").join(" "));
    }

    setQuery(fetchUrl);

    return () => {
      setQuery("");
      setTitle("Movies");
      setPage(1);
    };
  }, [location, params]);

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
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <div style={{ paddingTop: 72 }}>
      <div className="m-3">
        <Filters genres={genres} countries={countries} />
      </div>
      <Title
        name={title}
        showExplore={false}
        canClick={false}
        isLoading={loading}
      />
      <div className="row gy-4 px-3 pb-5 gx-3 row-cols-2 row-cols-sm-4 row-cols-md-5 row-cols-lg-6">
        {list?.map((movie, i) => {
          const genres = movie.genre_ids.map((code) => getGenre(code));
          return <Movie key={`movie_rx_${i}`} movie={movie} genres={genres} />;
        })}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      <div ref={loader}></div>
    </div>
  );
}

// function Moviesz({ prop, getGenreCode, getGenre, genres, countries }) {
//   let params = useParams();
//   let location = useLocation();

//   const [title, setTitle] = useState("Movies");
//   const [movieData, setMovieData] = useState([]);
//   const [movies, setMovies] = useState([]);
//   const [hero, setHero] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const responseData = useRef(null);
//   const page = useRef(0);
//   let bottomBoundaryRef = useRef(null);
//   let isBusy = false;

//   function loadHero(movie) {
//     const title = movie.title ? movie.title : movie.original_title;
//     const imgSrc = movie.backdrop_path;

//     setHero(
//       <HeroItem
//         id={movie.id}
//         name={title}
//         imgUrl={imgSrc}
//         year={movie.release_date}
//         vote={movie.vote_average}
//         overview={movie.overview}
//         genresIds={movie.genre_ids}
//         getGenre={getGenre}
//       />
//     );
//   }

//   function getFetchUrl(pageNum) {
//     const pathname = location?.pathname;
//     if (!pathname) return;

//     let fetchUrl;

//     if (pathname.startsWith("/genre")) {
//       fetchUrl = getGenreUrl(getGenreCode(params[prop]), pageNum);
//     } else if (pathname.startsWith("/discover")) {
//       const navEl = getDiscoverObj(params[prop]);
//       fetchUrl = navEl?.url;
//     } else if (pathname.startsWith("/filter")) {
//       const p = "/filter/";
//       const query = pathname.slice(p.length - 1);
//       fetchUrl = getMovieDiscoverUrl(query);
//     } else if (pathname.startsWith("/search")) {
//       const p = "/search/q=";
//       const query = pathname.slice(p.length - 1);
//       fetchUrl = getSearchUrl(query.split("%20").join(" "));
//     }

//     return fetchUrl;
//   }

//   async function getItems() {
//     page.current += 1;

//     //if (page.current <= 0) return;
//     //if (page.current > responseData.current?.total_pages) return;

//     // setIsLoading(true);
//     console.log("load page: ", page.current);

//     let fetchUrl = getFetchUrl(page.current);
//     if (!fetchUrl) return;

//     const response = await axios.get(fetchUrl + `&page=${page.current}`);

//     //if (!response || !response.data || !response.data.results) return;
//     const moviePlaceholders = Array(20).fill({});
//     setMovies([...movies, ...moviePlaceholders]);
//     //setMovieData([...movieData, ...response.data.results]);
//     // if (page.current === 1 && location?.pathname !== "/discover") {
//     //   const items = [...response.data.results];
//     //   const removed = items.splice(0, 1);
//     //   if (removed.length > 0) loadHero(removed[0]);
//     //   setMovies(items);
//     // } else {
//     //   setMovies([...movies, ...response.data.results]);
//     // }

//     // responseData.current = {
//     //   total_pages: response.data.total_pages,
//     //   total_results: response.data.total_results,
//     // };

//     // setIsLoading(false);

//     return true;
//   }

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     const pathname = location?.pathname;

//     if (!pathname) return;

//     if (pathname.startsWith("/genre")) {
//       setTitle(`${capitalizeStr(params[prop])} Movies`);
//     } else if (pathname.startsWith("/discover")) {
//       const navEl = getDiscoverObj(params[prop]);
//       setTitle(navEl?.name);
//     } else if (pathname.startsWith("/filter")) {
//       setTitle("Filter movies");
//     } else if (pathname.startsWith("/search")) {
//       const p = "/search/q=";
//       const query = pathname.slice(p.length);
//       setTitle(`Movies with “${query.split("%20").join(" ")}”`);
//     }

//     return () => {
//       setMovies([]);
//       setTitle("Movies");
//       setHero(null);
//       setIsLoading(false);
//       responseData.current = null;
//       page.current = 0;
//     };
//   }, [location]);

//   // INFINITE scrollTop
//   const scrollObserver = useCallback((node) => {
//     new IntersectionObserver(
//       (entries) => {
//         if (!isLoading && entries[0].isIntersecting) {
//           setIsLoading(true);
//           getItems().finally(() => setIsLoading(false));
//         }
//       },
//       {
//         rootMargin: "0px 0px 200px 0px",
//       }
//     ).observe(node);
//   });

//   useEffect(() => {
//     if (bottomBoundaryRef.current) {
//       scrollObserver(bottomBoundaryRef.current);
//     }
//   }, [scrollObserver, bottomBoundaryRef]);

//   return (
//     <div style={{ paddingTop: 72 }}>
//       {hero}
//       <div className="m-3">
//         <Filters genres={genres} countries={countries} />
//       </div>
//       <Title
//         name={title}
//         showExplore={false}
//         canClick={false}
//         isLoading={isLoading}
//       />
//       <div className="row gy-4 px-3 pb-5 gx-3 row-cols-2 row-cols-sm-4 row-cols-md-5 row-cols-lg-6">
//         {movies?.map((movie, i) => {
//           // const genres = movie.genre_ids.map((code) => getGenre(code));
//           return <Movie key={i} movie={movie} />;
//         })}
//       </div>
//       <div
//         id="page-bottom-boundary"
//         ref={bottomBoundaryRef}
//         style={{ height: "1px", width: "100%", backgroundColor: "blue" }}
//       ></div>
//     </div>
//   );
// }

export default Movies;
