import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import styles from './search.module.css';

import SearchResult from './SearchResult';
import { getSearchSuggestions } from '../tmdb/getData';

function Search({ toggleSidebar }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [containerWidth, setContainerWidth] = useState('300px');
  const containerRef = useRef();
  let navigate = useNavigate();

  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      if (entry.contentBoxSize) {
        // Firefox implements `contentBoxSize` as a single content rect, rather than an array
        const contentBoxSize = Array.isArray(entry.contentBoxSize)
          ? entry.contentBoxSize[0]
          : entry.contentBoxSize;

        setContainerWidth(contentBoxSize.inlineSize + 'px');
      } else {
        setContainerWidth('100%');
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

  async function handleOnChange(event) {
    setIsLoading(true);

    const value = event.currentTarget.value;
    setQuery(value);
    if (value) {
      const response = await getSearchSuggestions(value);
      setMovies(response?.slice(0, 3));
    } else {
      setMovies([]);
    }

    setIsLoading(false);
  }

  const handleOnFocus = (event) => {
    if (containerRef.current && containerRef.current.style.display === 'none')
      return;

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const placeholder = (
    <div class={`col ${styles.placeholder}`}>
      {query ? 'no results found' : 'Results will show here...'}
    </div>
  );

  const viewAllBtn = (
    <div
      role="button"
      class={`col ${styles.button}`}
      onClick={() => handleClick()}
    >
      View all results
    </div>
  );
  const bottom = movies?.length > 0 ? viewAllBtn : placeholder;

  return (
    <div className="container-fluid g-0">
      <div className="row row-cols-1">
        <div className="col">
          <form
            ref={containerRef}
            autoComplete="off"
            className="position-relative"
            aria-describedby={id}
            variant="contained"
            onSubmit={handleClick}
          >
            <input
              id="search"
              type="text"
              spellCheck
              focus="false"
              autoComplete="off"
              placeholder="Search movies"
              onFocus={handleOnFocus}
              value={query}
              onChange={handleOnChange}
              className={`${styles.input}`}
            />
            <label
              htmlFor="search"
              className="position-absolute start-0 ms-3"
              style={{ marginTop: 9 }}
            >
              <i className="bi bi-search"></i>
            </label>

            {isLoading && (
              <div
                className="spinner-border spinner-border-sm me-2 position-absolute end-0"
                role="status"
                style={{ marginTop: 10 }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </form>
        </div>
        <div className="col">
          <Popover
            id={id}
            open={open}
            disableAutoFocus={true}
            disableEnforceFocus={true}
            anchorEl={anchorEl}
            onClose={handleClose}
            style={{ zIndex: 9999 }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            PaperProps={{
              style: { width: `${containerWidth}` },
            }}
          >
            <div className="row g-0 row-cols-1">
              <div className="col">
                {movies?.map((movie, index) => {
                  return (
                    <Link
                      key={index}
                      to={`/movie/${movie.title}-${movie.id}`}
                      className="p-2"
                      onClick={() => toggleSidebar()}
                    >
                      <SearchResult movie={movie} />
                    </Link>
                  );
                })}
              </div>
              {bottom}
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default Search;
