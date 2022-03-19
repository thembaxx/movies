import React from "react";
import { Link } from "react-router-dom";
import styles from "./nav.module.css";

import { navigation } from "../tmdb/data";

const navLinks = [
  navigation.discover,
  navigation.popular,
  navigation.topRated,
  navigation.trending,
  navigation.upcoming,
  navigation.about,
];

function Nav({ toggleSidebar }) {
  return (
    <nav className="px-3 py-0">
      <div className="d-flex ps-1 flex-column">
        {navLinks.map((link, index) => {
          return (
            <Link
              key={index}
              to={link.getRoute()}
              className={`d-flex align-items-center `}
              onClick={() => toggleSidebar()}
            >
              <div className={`${styles.link}`}>
                <span>{link.name}</span>
                <div className={`${styles.button}`}>
                  <i className="bi bi-arrow-right-short fs-6"></i>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default Nav;
