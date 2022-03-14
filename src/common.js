import React from 'react';

export const paramProp = 'name';
export const filterProp = 'queryStr';

export const route = {
  home: '/',
  discover: '/discover',
  discoverList: `/discover/:${paramProp}`,
  movies: '/movies',
  genre: `/genre/:${paramProp}`,
  filter: `/filter/:${filterProp}`,
  search: `/search/:${filterProp}`,
  country: `/country/:${paramProp}`,
  movie: `/movie/:${paramProp}`,
  about: '/about',
};
