import React from "react";
import { Link } from "react-router-dom";
import commonStyles from "../common/common.module.css";

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
      <div className="d-flex ps-1 flex-column align-items-start">
        {navLinks.map((link, index) => {
          return (
            <Link
              key={index}
              to={link.getRoute()}
              style={{ fontSize: 17, fontWeight: 500, padding: "2px 0" }}
              className={`d-flex align-items-center `}
              onClick={() => toggleSidebar()}
            >
              <span
                className={`position-relative text-capitalize ${commonStyles.link}`}
              >
                {link.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default Nav;
