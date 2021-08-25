import { API_KEY } from "../constants/api";
import { fetchApi } from "../helpers/fetch-api";

export const getBillBoard = async (getOne = false) => {
  const data = await fetchApi(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`,
    "movie",
    getOne
  );
  return data;
};

// MOVIES

export const getTrendingMovies = async (getOne = false) => {
  const data = await fetchApi(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`,
    "movie",
    getOne
  );
  return data;
};

export const getUpComingMovies = async (getOne = false) => {
  const data = await fetchApi(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=4bbfe69826656ab001dddb7120b12d9c&language=en-US&page=1`,
    "movie",
    getOne
  );

  return data;
};

export const getTopRatedMovies = async (getOne = false) => {
  const data = await fetchApi(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=4bbfe69826656ab001dddb7120b12d9c&language=en-US&page=1`,
    "movie",
    getOne
  );

  return data;
};

export const getNowPlaying = async (getOne = false) => {
  const data = await fetchApi(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=4bbfe69826656ab001dddb7120b12d9c&language=en-US&page=1`,
    "movie",
    getOne
  );

  return data;
};
export const getSimilarMovies = async (id, getOne = false) => {
  const data = await fetchApi(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`,
    "movie",
    getOne
  );

  return data;
};

export const getCollection = async (id, getOne = false) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/collection/${id}?api_key=${API_KEY}&language=en-US`)

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Could not Complete your request please try again"
    );
  }

  const newData = data.parts.map((item) => {
    return { ...item, type: 'movie' };
  });
  return newData;
};



// TV

export const getTrendingTv = async (getOne = false) => {
  const data = await fetchApi(
    `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`,
    "tv",
    getOne
  );

  return data;
};

export const getTopRatedTv = async (getOne = false) => {
  const data = await fetchApi(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=4bbfe69826656ab001dddb7120b12d9c&language=en-US&page=1`,
    "tv",
    getOne
  );

  return data;
};

export const getTvAiringToday = async (getOne = false) => {
  const data = await fetchApi(
    `https://api.themoviedb.org/3/tv/airing_today?api_key=4bbfe69826656ab001dddb7120b12d9c&language=en-US&page=1`,
    "tv",
    getOne
  );

  return data;
};

export const getUpComingTv = async (getOne = false) => {
  const data = await fetchApi(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=4bbfe69826656ab001dddb7120b12d9c&language=en-US&page=1`,
    "tv",
    getOne
  );

  return data;
};

export const getPeople = async (getOne = false) => {
  const data = await fetchApi(
    `https://api.themoviedb.org/3/person/recommendations?api_key=4bbfe69826656ab001dddb7120b12d9c&language=en-US&page=1`,
    "people",
    getOne
  );

  return data;
};

export const getSimilarTv = async (id, getOne = false) => {
  const data = await fetchApi(
    `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`,
    "tv",
    getOne
  );

  return data;
};

// /////////////////////////////////////////////////////
// SEASONS
export const getSeason = async (id, season) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Could not Complete your request please try again"
    );
  }
  return data;
};


// /////////////////////////////////////////////////////

export const getMovieDetails = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=4bbfe69826656ab001dddb7120b12d9c&language=en-US`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Could not Complete your request please try again"
    );
  }
  return data;
};

export const getTvDetails = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Could not Complete your request please try again"
    );
  }

  return data;
};
