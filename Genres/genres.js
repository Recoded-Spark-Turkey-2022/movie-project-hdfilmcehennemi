"use strict";

const fetchMoviesByGenre = async (genreId) => {
  const url = constructUrl(`discover/movie?with_genres=${genreId}`);
  const res = await fetch(url);
  return res.json();
};
