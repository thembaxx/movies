import React from "react";
import Slide from "@mui/material/Slide";
import styles from "./sidebar.module.css";

import { email } from "../constants";

import Header from "./Header";
import Search from "../search/Search";
import Nav from "./Nav";
import Footer from "../footer/Footer";

function Sidebar({ toggleSidebar, isOpen, genres }) {
  return (
    <div
      id="sidebar"
      className={`container-fluid position-fixed top-0 h-100 w-100 p-0 m-0 ${styles.container}`}
      style={{ display: `${isOpen ? "block" : "none"}` }}
    >
      <div
        className={`${styles.backdrop}`}
        onClick={toggleSidebar}
        style={{ opacity: `${isOpen ? 1 : 0}` }}
      ></div>
      <Slide direction="right" in={isOpen} mountOnEnter unmountOnExit>
        <div className={`row h-100 p-0 m-0`}>
          <div
            className={`d-flex flex-column col-sm-4 col-md-4 p-0 m-0 h-100 position-relative ${styles.inner}`}
          >
            <div className="py-3 px-3">
              <Header toggleSidebar={toggleSidebar} genres={genres} />
              <div className="py-3 w-100">
                <Search toggleSidebar={toggleSidebar} />
              </div>
            </div>
            <div className="flex-grow-1">
              <Nav toggleSidebar={toggleSidebar} />
            </div>
            <div className="px-3">
              <a
                rel="noreferrer"
                href={`mailto:${email}`}
                style={{ fontWeight: 500, color: "#f3ce13" }}
              >
                {email}
              </a>
            </div>
            <hr className="mx-3 me-4" />

            <div className="px-3 py-2">
              <Footer />
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
}

export default Sidebar;
