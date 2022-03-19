import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./style.css";

import { route, paramProp, filterProp } from "./common";
import { getGenres, getCountries } from "./tmdb/getData";

import Nav from "./nav/Nav";
import Home from "./pages/home/Home";
import Discover from "./pages/discover/Discover";
import Movies from "./pages/movies/Movies";
import Movie from "./pages/movie/Movie";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import Sidebar from "./sidebar/Sidebar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  function getGenreCode(name) {
    if (!name) return;

    const match = genres.find(
      (genre) => genre.name.toLowerCase() === name.toLowerCase()
    );

    return match ? match.id : null;
  }

  function getGenre(code) {
    if (!code) return;

    const match = genres.find((genre) => genre.id == code);

    return match;
  }

  useEffect(() => {
    async function getData() {
      let response = await getGenres();
      setGenres(response);

      let response2 = await getCountries();
      setCountries(response2);
    }

    getData();
  }, []);

  return (
    <div>
      <Nav
        toggleSidebar={toggleSidebar}
        genres={genres}
        countries={countries}
      />

      <Routes>
        <Route path={route.home} element={<Home />} />
        <Route
          path={route.discover}
          element={<Discover genres={genres} countries={countries} />}
        />
        <Route
          path="/movies/:query"
          element={
            <Movies
              prop="query"
              getGenreCode={getGenreCode}
              getGenre={getGenre}
              genres={genres}
              countries={countries}
            />
          }
        />
        {/* <Route
          path={route.genre}
          element={
            <Movies
              prop={paramProp}
              getGenreCode={getGenreCode}
              getGenre={getGenre}
              genres={genres}
              countries={countries}
            />
          }
        />
        <Route
          path={route.country}
          element={
            <Movies
              prop={paramProp}
              getGenreCode={getGenreCode}
              getGenre={getGenre}
              genres={genres}
              countries={countries}
            />
          }
        />
        <Route
          path={route.discoverList}
          element={
            <Movies
              prop={paramProp}
              getGenreCode={getGenreCode}
              getGenre={getGenre}
              genres={genres}
              countries={countries}
            />
          }
        />
        <Route
          path={route.filter}
          element={
            <Movies
              prop={filterProp}
              getGenreCode={getGenreCode}
              getGenre={getGenre}
              countries={countries}
              genres={genres}
            />
          }
        />
        <Route
          path={route.search}
          element={
            <Movies
              prop={filterProp}
              getGenreCode={getGenreCode}
              getGenre={getGenre}
              countries={countries}
              genres={genres}
            />
          }
        /> */}
        <Route path={route.movie} element={<Movie prop={paramProp} />} />
        <Route path={route.about} element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        genres={genres}
      />
    </div>
  );
}

export default App;
