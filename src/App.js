import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "./style.css";

import { route, paramProp } from "./common";
import { getGenres, getCountries, getCertifications } from "./tmdb/getData";
import { actions, initialsArgs, reducer } from "./store";

export const SharedStateContext = createContext();

import Nav from "./nav/Nav";
import Home from "./pages/home/Home";
import Discover from "./pages/discover/Discover";
import Movies from "./pages/movies/Movies";
import Movie from "./pages/movie/Movie";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import Sidebar from "./sidebar/Sidebar";

function App() {
  const [state, dispatch] = useReducer(reducer, initialsArgs);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function toggleSidebar() {
    setSidebarOpen((prev) => !prev);
  }

  useEffect(() => {
    async function getData() {
      setIsLoading(true);

      const genres = await getGenres();
      const countries = await getCountries();
      const certifications = await getCertifications();
      dispatch({
        type: actions.setData,
        payload: {
          genres,
          countries,
          certifications,
        },
      });

      setIsLoading(false);
    }

    getData();
  }, []);

  return (
    <div>
      <SharedStateContext.Provider value={{ state }}>
        <div>
          <Nav toggleSidebar={toggleSidebar} />

          <Routes>
            <Route path={route.home} element={<Home />} />
            <Route path={route.discover} element={<Discover />} />
            <Route path="/movies/:query" element={<Movies prop="query" />} />

            <Route path={route.movie} element={<Movie prop={paramProp} />} />
            <Route path={route.about} element={<About />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>

          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
      </SharedStateContext.Provider>

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(12px)",
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default App;
