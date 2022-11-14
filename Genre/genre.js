'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const genresNav = document.getElementById("genres")



// generate the genres url 
const genresUrl = (genreId) => {
  return `${TMDB_BASE_URL}/discover/movie?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}&sort_by=popularity.desc&with_genres=${genreId}`;
}

// generate the list of movies for one genre
const genreFilter = async (genreId) => {
  const url = genresUrl(genreId)
  const response = await fetch(url)
  const data = await response.json()
  renderMovies(data.results)
}


// fetch the genres object 
const fetchGenres = async () => {
  const url = constructUrl(`/genre/movie/list`);
  const res = await fetch(url);
  const data = await res.json()
  return data['genres']
}


// fetch the movie genre 
const getGenre = async (ida) => {
  const res = await fetchGenres();
  for (let i in res) {
    if (res[i].id === ida) {
      return res[i].name
    }
  }

}
