import React from "react";
import styles from "./nav.module.css";

// import { moviesList } from "./data";

import Logo from "../common/Logo";
import ToggleButton from "./ToggleButton";
import Search from "../search/Search";
import Links from "./Links";
// import NavLink from "./navLink/NavLink";

const contentId = "navbar-content";

function Nav({ toggleSidebar, genres, countries }) {
  return (
    <nav className={`navbar navbar-expand-md fixed-top ${styles.container}`}>
      <div className="container-fluid d-flex align-items-center px-3">
        <Logo />
        {/* <div className="d-flex align-items-center">
          <Logo />
          <div style={{ marginLeft: -16 }}>
            <NavLink
              name="Categories"
              isPopup
              responsive={false}
              items={moviesList}
            />
          </div>
        </div> */}

        <ToggleButton target={contentId} toggleSidebar={toggleSidebar} />

        <div className="collapse navbar-collapse">
          <div
            id={contentId}
            className="flex-grow-1 d-flex align-items-center justify-content-between"
          >
            <div className="ms-4 w-100 me-2" style={{ maxWidth: 500 }}>
              <Search />
            </div>
            <div className="me-4">
              <Links genres={genres} countries={countries} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
