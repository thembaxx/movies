import React, { useState } from 'react';
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
  let navigate = useNavigate();

  function handleClick() {
    navigate(`/search/q=${query}`);
    toggleSidebar();
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
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <form
            autoComplete="off"
            className="d-flex flex-grow-1 align-items-center position-relative"
            aria-describedby={id}
            variant="contained"
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
              className={`flex-grow-1 ps-5 pe-5 ${styles.input}`}
            />
            <label
              htmlFor="search"
              className="position-absolute ms-3"
              style={{ marginTop: 3 }}
            >
              <i className="bi bi-search"></i>
            </label>

            {isLoading && (
              <div
                className="spinner-border spinner-border-sm me-2 position-absolute end-0"
                role="status"
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
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <div>
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
              <div
                role="button"
                class={`${styles.button}`}
                onClick={() => handleClick()}
              >
                View all results
              </div>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default Search;
