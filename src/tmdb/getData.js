import { API_KEY } from "./constants";
import axios from "./axios";

import { navigation, requests } from "./data";

/********************* MOVIE INFO **************************************/
export async function getMovie(id) {
  const response = await axios.get(
    `/movie/${id}?api_key=${API_KEY}&language=en-US`
  );

  return response?.data;
}

export async function getMovieCredits(id) {
  const response = await axios.get(
    `/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );

  return response?.data;
}

export async function getSimilarMovies(id) {
  const response = await axios.get(
    `/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
  );

  if (!response || !response.data || !response.data.results) return null;

  return response.data.results;
}

export async function getReviews(id) {
  const response = await axios.get(
    `/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
  if (!response || !response.data || !response.data.results) return null;

  return response.data.results;
}

/********************* FETCH URL **************************************/
export function getGenreUrl(code) {
  if (!code) return null;

  return `/discover/movie?api_key=${API_KEY}&with_genres=${code}&sort_by=release_date.desc`;
}

export function getDiscoverObj(name) {
  for (const [key, value] of Object.entries(navigation)) {
    if (value.routeAlias === name) {
      return value;
    }
  }
}

/********************* FILTERS (DISCOVER) ******************************/
export async function getGenres() {
  const response = await axios.get(
    `/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );

  if (!response || !response.data || !response.data.genres) return null;

  return response.data.genres;
}

export async function getCountries() {
  const response = await axios.get(requests.countries);

  if (!response || !response.data) return null;

  return response.data.map((country) => {
    return {
      name: country.english_name,
      ISO: country.iso_3166_1,
      english_name: country.english_name,
      native_name: country.native_name,
    };
  });
}

export function constructQuery(q, genre, country, sort, years) {
  let query = ``;

  if (genre && genre.length > 0) {
    query += `&with_genres=${genre.map((c) => c.id).join(", ")}`;
  }

  if (sort) {
    query += `&sort_by=${sort.prop}`;
  }

  const yearQ = constructYearQuery(years);
  if (yearQ) {
    query += yearQ;
  }

  return query;
}

function constructYearQuery(years) {
  if (!years) return;

  let query;
  let dates = [];

  const yrs = years.filter((yr) => !yr.isRange);
  const ranges = years.filter((yr) => yr.isRange);

  // Years
  if (yrs?.length > 0) {
    let yearArr = yrs.map((yr) => yr.name);
    dates.push(...yearArr);
  }

  // Ranges
  if (ranges?.length > 0) {
    ranges.forEach((range) => {
      for (let i = range.start; i <= range.end; i++) {
        dates.push(i);
      }
    });
  }

  const set = new Set(dates); // remove duplicates
  dates = Array.from(set);

  if (dates?.length > 0) {
    query = `&primary_release_year=${dates.join(`|`)}`;
  }

  return query;
}

export function getMovieDiscoverUrl(query) {
  if (!query) return null;
  /* https://api.themoviedb.org/3/discover/movie?api_key=###&primary_release_date.gte=2020-01-01&primary_release_date.lte=2020-12-31

  // const url = `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35,56&include_adult=false&include_video=false&year=2021&with_watch_monetization_types=flatrate&sort_by=revenue.asc&page=1`;

  // const uri = `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31&vote_average.gte=6&with_genres=28`; */

  return `/discover/movie?api_key=${API_KEY}&language=en-US&${query}`;
  ///discover/movie?sort_by=popularity.desc
  //&certification.lte=G&sort_by=popularity.desc
}

export function getGenreNavObj(code) {
  return `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${code}&sort_by=release_date.desc`;
}

export function getDiscoveryNav(genres) {
  let today = new Date().toISOString().slice(0, 10);

  let results = [
    {
      name: "Latest movies",
      url: `/discover/movie?api_key=${API_KEY}&primary_release_date.lte=${today}&with_original_language=en`,
      route: `/filter/&primary_release_date.lte=${today}&with_original_language=en`,
      isLink: true,
    },
  ];

  let g = genres.map((genre) => {
    return {
      name: `${genre.name} movies`,
      url: `/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}&sort_by=popularity.desc&with_original_language=en`,
      route: `/filter/&with_genres=${genre.id}&sort_by=popularity.desc&with_original_language=en`,
      isLink: true,
    };
  });

  results = [...results, ...g];
  return results;
}

/********************* SEARCH **************************************/
export async function getSearchSuggestions(q) {
  const uri = getSearchUrl(q);
  console.log(uri);
  const response = await axios.get(uri);

  return response?.data?.results;
}

export function getSearchUrl(query) {
  return `/search/movie?api_key=${API_KEY}&language=en-US&include_adult=false&query=${query}`;
}
