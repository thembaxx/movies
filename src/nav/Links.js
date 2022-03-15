import React from "react";

import { navLinks, movieList } from "./data";
import { navigation } from "../tmdb/data";

import NavLink from "./navLink/NavLink";

function Links({ genres, countries }) {
  const getItems = (nav) => {
    if (nav.isLink) return;

    return nav.name === navigation.genre.name
      ? genres
      : nav.name === navigation.country.name
      ? countries
      : movieList;
  };

  return (
    <div className="d-flex">
      {navLinks.map((link, index) => (
        <NavLink
          key={`${link.name}_nv_${index}`}
          name={link.name}
          isPopup={!link.isLink}
          items={getItems(link)}
          route={link.route}
          routBase={link?.route}
        />
      ))}
    </div>
  );
}

export default Links;
