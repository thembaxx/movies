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
  search: `/search/movie?api_key=${API_KEY}&language=en-US&include_adult=false&query=`,
};

export const movieEndpoints = {
  recent: getEndpoint("recent", requests.recent),
  popular: getEndpoint("popular", requests.popular),
  nowPlaying: getEndpoint("now playing", requests.nowPlaying),
  trending: getEndpoint("trending", requests.trending),
  topRated: getEndpoint("top rated", requests.topRated),
  upcoming: getEndpoint("popular", requests.fetchUpcoming),
  genre: getEndpoint("genre", requests.genre),
  search: getEndpoint("search", requests.search),
};

export const navigation = {
  popular: Object.assign({}, movieEndpoints.popular, { isLink: true }),
  trending: Object.assign({}, movieEndpoints.trending, { isLink: true }),
  nowPlaying: Object.assign({}, movieEndpoints.nowPlaying, { isLink: true }),
  upcoming: Object.assign({}, movieEndpoints.upcoming, { isLink: true }),
  genre: Object.assign({}, movieEndpoints.genre, { isLink: false }),
  topRated: Object.assign({}, movieEndpoints.topRated, { isLink: true }),
  movies: Object.assign({}, movieEndpoints.recent, { name: 'Movies', isLink: true }),
  discover: {
    name: "Discover",
    getRoute: () => route.discover,
    isLink: true,
  },
  country: {
    name: "Country",
    getRoute: () => route.country,
    isLink: false,
  },
  about: {
    name: "About",
    getRoute: () => route.about,
    isLink: true,
  },
};

function getEndpoint(title, url) {
  return {
    name: title,
    endpoint: `/${title.split(" ").join("-")}`,
    url: url,
    getRoute: function (params) {
      if (!params) {
        return `/movies/${title.split(" ").join("-")}`;
      } else {
        return `/movies/${title.split(" ").join("-")}?${params}`;
      }
    },
  };
}
