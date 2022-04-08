import React from "react";
import styles from "./nav.module.css";

import Logo from "../common/Logo";
import ToggleButton from "./ToggleButton";
import Search from "../search/Search";
import Links from "./Links";

const contentId = "navbar-content";

function Nav({ toggleSidebar, genres, countries }) {
  return (
    <nav className={`navbar navbar-expand-md fixed-top ${styles.container}`}>
      <div className="container-fluid d-flex align-items-center justify-content-between px-3">
        <div className="flex-grow-1 d-flex align-items-center">
          <Logo />
          <div
            className="flex-grow-1 d-none d-sm-block ms-4 me-2"
            style={{ maxWidth: 500 }}
          >
            <Search />
          </div>
        </div>

        <ToggleButton target={contentId} toggleSidebar={toggleSidebar} />

        <div className="collapse navbar-collapse">
          <div id={contentId} className="me-3 w-100 d-flex justify-content-end">
            <Links />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
