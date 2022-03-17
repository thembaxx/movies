import React from "react";
import { API_KEY } from "./constants";
import { route } from "../common";

export const requests = {
  popular: `/movie/popular?api_key=${API_KEY}&language=en-US`,
  // popular: `/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`,
  trending: `trending/movie/week?api_key=${API_KEY}&language=en-US`,
  trendingDaily: `/trending/movie/day?api_key=${API_KEY}&language=en-US`,
  nowPlaying: `/movie/now_playing?api_key=${API_KEY}&language=en-US`,
  topRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchUpcoming: `/movie/upcoming?api_key=${API_KEY}&language=en-US`,
  countries: `/configuration/countries?api_key=${API_KEY}`,
};

export const navigation = {
  popular: {
    name: "Popular",
    url: requests.popular,
    routeAlias: "popular",
    route: `/discover/popular`,
    isLink: true,
    icon: <i className="bi bi-award"></i>,
  },
  trending: {
    name: "Trending",
    url: requests.trendingDaily,
    routeAlias: "trending",
    route: `/discover/trending`,
    isLink: true,
    icon: <i className="bi bi-ticket-perforated"></i>,
  },
  nowPlaying: {
    name: "In Theatres",
    url: requests.nowPlaying,
    routeAlias: "in-theatres",
    route: `/discover/in-theatres`,
    isLink: true,
  },
  upcoming: {
    name: "Coming Soon",
    url: requests.fetchUpcoming,
    routeAlias: "coming-soon",
    route: `/discover/coming-soon`,
    isLink: true,
    icon: <i className="bi bi-calendar-event"></i>,
  },
  discover: {
    name: "Discover",
    route: route.discover,
    isLink: true,
    icon: <i className="bi bi-compass"></i>,
  },
  movies: {
    name: "Movies",
    route: route.movies,
    isLink: true,
  },
  country: {
    name: "Country",
    route: "/country/",
    isLink: false,
  },
  genre: {
    name: "Genre",
    route: "/genre/",
    isLink: false,
  },
  topRated: {
    name: "Top Rated",
    url: requests.topRated,
    routeAlias: "top-rated",
    route: `/discover/top-rated`,
    isLink: true,
    icon: <i className="bi bi-stars"></i>,
  },

  about: {
    name: "About",
    route: route.about,
    isLink: true,
    icon: <i className="bi bi-record-btn-fill"></i>,
  },
};
