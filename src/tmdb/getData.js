import { API_KEY } from "./constants";
import axios from "./axios";

import { requests, movieEndpoints } from "./data";

/********************* MOVIE INFO **************************************/

export async function getMovie(id) {
  const response = await axios.get(
    `/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=release_dates`
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

/********************* FILTERS (DISCOVER) ******************************/

export async function getGenres() {
  const response = await axios.get(
    `/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );

  return response?.data?.genres;
}

export async function getPopularGenres(genres) {
  const popularGenres = [
    "adventure",
    "action",
    "science fiction",
    "drama",
    "comedy",
    "thriller",
    "horror",
    "romantic",
    "documentary",
  ];

  if (!genres) return;

  let genreMatches = [];
  popularGenres.forEach((genre) => {
    const match = genres?.find(
      (g) => g.name.toLowerCase() === genre.toLowerCase()
    );

    if (match) genreMatches.push(match);
  });

  return genreMatches?.map((genre) => ({
    name: `${genre.name}`,
    url: `/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}&sort_by=popularity.desc&with_original_language=en`,
    getRoute: function () {
      return `/movies/genre?${genre.id}`;
    },
  }));
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

export const getCertifications = async () => {
  try {
    const response = await axios.get(requests.certifications);
    return response.data.certifications;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/********************* SEARCH & FILTER **************************************/

export function constructQuery(q, genre, country, sort, years) {
  let query = ``;

  if (genre && genre.length > 0) {
    query += `&with_genres=${genre.map((c) => c.id).join("|")}`;
  }

  if (sort) {
    query += `&sort_by=${sort.prop}`;
  }

  const yearQ = constructYearQuery(years);
  if (yearQ) {
    query += yearQ;
  }

  query += `&language=en-US`;
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

export async function getSearchSuggestions(q) {
  const uri = movieEndpoints.search.url + q;
  const response = await axios.get(uri);

  return response?.data?.results;
}

/********************* MOVIE ENDPOINTS **************************************/

export const getMovieEndpoint = (param) => {
  if (!param) return;
  let endpoint;

  const name = param.split("-").join(" ");

  const entries = Object.entries(movieEndpoints);

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (entry[1].name === name) {
      endpoint = entry[1];
      break;
    }
  }

  return endpoint;
};
