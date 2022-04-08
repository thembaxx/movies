import React, { useContext } from "react";

import { navLinks, movieList } from "./data";
import { navigation } from "../tmdb/data";

import NavLink from "./navLink/NavLink";
import { SharedStateContext } from "../App";

function Links() {
  const sharedContext = useContext(SharedStateContext);

  const getItems = (nav) => {
    if (nav.isLink) return;

    return nav.name === navigation.genre.name
      ? sharedContext.state.genres
      : nav.name === navigation.country.name
      ? sharedContext.state.countries
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
          route={link.getRoute()}
        />
      ))}
    </div>
  );
}

export default Links;
