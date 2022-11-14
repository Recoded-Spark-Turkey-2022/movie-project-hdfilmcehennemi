'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const genresNav = document.getElementById("genres")

let genres = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

genresMenu.addEventListener("click", (e) => {
  App.runGenres(e.target.id);
});

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
