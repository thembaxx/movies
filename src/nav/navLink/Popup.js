import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popover from "@mui/material/Popover";
import styles from "./popup.module.css";

function Popup({ items, routeBase, children }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const wrap = items?.length > 8;
  const containerClass = wrap
    ? "row row-cols-1 g-0 row-cols-md-2 row-cols-lg-2"
    : "row-cols-1";

  return (
    <div className="col">
      <div>
        <div
          aria-describedby={id}
          variant="contained"
          role="button"
          onClick={handleClick}
        >
          {children}
        </div>
        <Popover
          id={id}
          disableScrollLock={true}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            style: { maxWidth: `414px` },
          }}
        >
          <div className={`${styles.inner} container-fluid g-0 m-0 p-0`}>
            <div className={`${containerClass}`}>
              {items?.map((item, index) => {
                const to = `${routeBase}?${item?.id}`;

                return (
                  <Link
                    key={`${item.name}_rgxy_${index}`}
                    to={to}
                    onClick={handleClose}
                  >
                    <div className={`${styles.link} text-truncate`}>
                      {item.name}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </Popover>
      </div>
    </div>
  );
}

export default Popup;
