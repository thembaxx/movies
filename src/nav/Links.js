import React from 'react';

import NavLink from './navLink/NavLink';

import { navigation } from '../tmdb/data';

const navLinks = [
  navigation.discover,
  // navigation.country, incomplete :to-do
  navigation.genre,
  navigation.about,
];

function Links({ genres, countries }) {
  const movieList = [
    navigation.nowPlaying,
    navigation.topRated,
    navigation.trending,
    navigation.upcoming,
    navigation.popular,
  ];

  function generatePopover(nav, index) {
    const items =
      nav.name === navigation.genre.name
        ? genres
        : nav.name === navigation.country.name
        ? countries
        : movieList;

    let routBase;

    if (nav.name === navigation.genre.name) {
      routBase = nav.route;
    }

    if (nav.name === navigation.country.name) {
      routBase = nav.route;
    }

    return (
      <NavLink
        key={`${nav.name}_rrrr_${index}`}
        name={nav.name}
        isPopup
        items={items}
        routeBase={routBase}
      />
    );
  }

  function generateLink(link, index) {
    return <NavLink name={link.name} isPopup={false} route={link.route} />;
  }

  return (
    <div className="d-flex">
      {navLinks.map((link, index) =>
        link.isLink ? generateLink(link, index) : generatePopover(link, index)
      )}
    </div>
  );
}

export default Links;
