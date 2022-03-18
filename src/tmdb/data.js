import React from "react";
import { API_KEY } from "./constants";
import { route } from "../common";

const today = new Date().toISOString().slice(0, 10);

export const requests = {
  recent: `/discover/movie?api_key=${API_KEY}&primary_release_date.lte=${today}&with_original_language=en`,
  popular: `/movie/popular?api_key=${API_KEY}&language=en-US`,
  trending: `trending/movie/week?api_key=${API_KEY}`,
  trendingDaily: `/trending/movie/day?api_key=${API_KEY}`,
  nowPlaying: `/movie/now_playing?api_key=${API_KEY}`,
  topRated: `/movie/top_rated?api_key=${API_KEY}primary_release_date.lte=${today}&with_original_language=en`,
  fetchUpcoming: `/movie/upcoming?api_key=${API_KEY}`,
  countries: `/configuration/countries?api_key=${API_KEY}`,
  genre: `/discover/movie?api_key=${API_KEY}&primary_release_date.lte=${today}&with_original_language=en`,
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

export const movieEndpoints = {
  recent: getEndpoint("recent", requests.recent),
  popular: getEndpoint("popular", requests.popular),
  nowPlaying: getEndpoint("now playing", requests.nowPlaying),
  trending: getEndpoint("trending", requests.trending),
  topRated: getEndpoint("top rated", requests.topRated),
  upcoming: getEndpoint("popular", requests.fetchUpcoming),
  genre: getEndpoint("genre", requests.genre),
};

function getEndpoint(title, url) {
  return {
    name: title,
    endpoint: `/${title.split(" ").join("-")}`,
    url: url,
    getRoute: function (params) {
      if (!params) {
        return `/movies/${title}`;
      } else {
        return `/movies/${title}?${params}`;
      }
    },
  };
}
