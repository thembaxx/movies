import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popover from "@mui/material/Popover";

import styles from "./popup.module.css";

function Popup({ movie, name, genre, year, children }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const vote = movie?.vote_average * 10;
  const voteCount = `(${movie?.vote_count} votes)`;
  year = year?.split("-")?.[0];

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
      <div>
        <div
          aria-owns={open ? "mouse-over-popover" : undefined}
          variant="contained"
          role="button"
        >
          {children}
        </div>
        <Popover
          disableScrollLock={true}
          sx={{
            pointerEvents: "none",
          }}
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          disableRestoreFocus
        >
          <div className={`${styles.container} p-3`}>
            <div>
              <h6 className="text-wrap">{name}</h6>
              {/* Rating, Year */}
              <div className={`${styles.rating}`}>
                <div className={`${styles.rating}`}>
                  <i
                    className="bi bi-star-fill"
                    style={{
                      marginRight: 4,
                      marginTop: "-1px",
                      fontSize: ".7rem",
                      color: "#f3ce13",
                    }}
                  ></i>
                  <span>
                    <span>{vote / 10}</span>
                    <span className="opacity-75">/10</span>

                    <span>
                      {"  "} {voteCount}
                    </span>
                  </span>
                </div>
                <span style={{ marginLeft: 6 }}>· {year}</span>
              </div>

              <hr />

              {/* Overview */}
              <div className={`${styles.overview} lh-base`}>
                {movie?.overview}
              </div>

              <hr />

              {/* genre */}
              {genre && (
                <div className="text-truncate mt-2" style={{ marginRight: 6 }}>
                  {genre.join(", ")}
                </div>
              )}
            </div>
          </div>
        </Popover>
      </div>
    </div>
  );
}

export default Popup;
