import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import Popover from "@mui/material/Popover";
import styles from "./search.module.css";

import Backdrop from "@mui/material/Backdrop";
import SearchResult from "./SearchResult";
import { getSearchSuggestions } from "../tmdb/getData";

function Search({ toggleSidebar }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [popoverText, setPopoverText] = useState(
    "Start typing so see suggestions"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [containerWidth, setContainerWidth] = useState("300px");
  const containerRef = useRef();
  let navigate = useNavigate();

  useEffect(() => {
    return () => {
      setQuery("");
      setMovies([]);
      setContainerWidth("300px");
      setIsLoading(false);
      setAnchorEl(null);
      delayedQuery.cancel();
    };
  }, []);

  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      if (entry.contentBoxSize) {
        // Firefox implements `contentBoxSize` as a single content rect, rather than an array
        const contentBoxSize = Array.isArray(entry.contentBoxSize)
          ? entry.contentBoxSize[0]
          : entry.contentBoxSize;

        setContainerWidth(contentBoxSize.inlineSize + "px");
      } else {
        setContainerWidth("100%");
      }
    }
  });

  useEffect(() => {
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) resizeObserver.unobserve(containerRef.current);
    };
  }, [containerRef]);

  function handleClick() {
    navigate(`/search/q=${query}`);
    if (toggleSidebar) toggleSidebar();
  }

  const delayedQuery = useCallback(
    debounce((q) => sendQuery(q), 300),
    []
  );

  const sendQuery = useCallback(async (query) => {
    if (!query) return;
    setPopoverText("Loading...");

    try {
      setIsLoading(true);

      const response = await getSearchSuggestions(query);
      if (response.length > 4) setMovies(response?.slice(0, 4));
      else setMovies([]);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setPopoverText("Error occured, please try again.");
    }
  });

  async function handleOnChange(event) {
    const value = event.currentTarget.value;
    setQuery(value);
  }

  useEffect(() => {
    delayedQuery(query);

    return () => {
      setMovies([]);
    };
  }, [query]);

  const handleInputFocusChange = (event) => {
    event.preventDefault();

    setPopoverText("Start typing so see suggestions");

    if (event.type === "focus") {
      setIsFocused(true);

      if (containerRef.current && containerRef.current.style.display === "none")
        return;

      setAnchorEl(event.currentTarget);
    } else if (event.type === "blur") {
      setIsFocused(false);
      handleClose();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const placeholder = (
    <div className={`col ${styles.placeholder}`}>{popoverText}</div>
  );

  const viewAllBtn = (
    <div
      role="button"
      className={`col ${styles.button}`}
      onClick={() => handleClick()}
    >
      See all results
    </div>
  );

  const bottom = movies?.length > 0 ? viewAllBtn : placeholder;

  return (
    <div>
      <form
        ref={containerRef}
        autoComplete="off"
        className={`${styles.form}`}
        aria-describedby={id}
        variant="contained"
        onSubmit={handleClick}
      >
        <input
          id="search"
          type="text"
          spellCheck
          onFocus={handleInputFocusChange}
          onBlur={handleInputFocusChange}
          focus="false"
          autoComplete="off"
          placeholder="Search movies"
          value={query}
          onChange={handleOnChange}
          className={`${styles.input}`}
        />
        <label htmlFor="search" className="position-absolute start-0 ms-3">
          <i className="bi bi-search"></i>
        </label>

        <div className={`${styles.inputRight}`}>
          {isLoading && (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      </form>
      <Popover
        id={id}
        open={open}
        disableAutoFocus={true}
        disableEnforceFocus={true}
        anchorEl={anchorEl}
        onClose={handleClose}
        style={{ zIndex: 9999 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          style: { width: `${containerWidth}`, padding: 0, margin: 0 },
        }}
      >
        <div className="d-flex flex-column">
          <div>
            {movies?.map((movie, index) => (
              <SearchResult key={index} movie={movie} />
            ))}
          </div>
          {bottom}
        </div>
      </Popover>

      <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={isFocused}></Backdrop>
    </div>
  );
}

export default Search;
