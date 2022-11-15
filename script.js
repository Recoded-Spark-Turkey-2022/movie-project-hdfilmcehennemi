'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  const actors=await fetchActors(id);
  renderMovies(movies.results);
  renderActors(actors.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
  };
  

// You may need to add to this function, definitely don't delete it.

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};
const fetchActors = async (id) => {
  const url = constructUrl(`movie/${id}/credits`);
  const res = await fetch(url);
  //console.log(res.json())
  return res.json();
};

const  fetchActor=async(personId) =>{
  const url = constructUrl(`person/${personId}`);
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
}
const fetchGenreMovies = async (id) => {
  const url = `${TMDB_BASE_URL}/discover/movie
  ?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}&with_genres=${id}`;
  //const url =constructUrl(`discover/movie/&with_genres=${id}`)
  const res = await fetch(url);
  const data = await res.json();
  CONTAINER.innerHTML = "";
  renderMovies(data.results);
  return data;
};
const fetchGenreList = async () => {
  const url = constructUrl("genre/movie/list");
  const res = await fetch(url);
  const data = await res.json();
  renderGeners(data.geners);
}
const fetchTrailer = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/videos`);
  const res = await fetch(url);
  return res.json();
};

const fetchRelatedMovies = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/similar`);
  const res = await fetch(url);
  return res.json();
};
const popularActors=async()=> {
  const url = constructUrl(`person/popular`);
  const response = await fetch(url);
  const data = await response.json();
  console.log(data)
}

const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  renderMovie(movieRes);
};
const actorDetails = async (actor) => {
  const actorRes = await fetchActor(actor.id);
  renderActor(actorRes);
};
const renderGeners = (geners) => {
  geners.forEach((gener) => {
    const { id, name } = gener;
    const listGenres = document.createElement("option");
    listGenres.setAttribute("value", `${id}`);
    listGenres.setAttribute("class", "dropdown-item");
    listGenres.innerText = name;
    geners.append(option);
  });
}
// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie-container");
  // movieDiv.class="movie-container";
    movieDiv.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
     movie.title
   } poster" style="width:100%"></img> 
     <div class="card-body">
     <h3 class="card-title">${movie.title}</h3>
     <a href="#" class="btn btn-secondary" style>More detail</a>
     </div>
   </div>`;
  
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });

    //movieDiv.setAttribute(id ,'movie-container');
    CONTAINER.appendChild(movieDiv);
  });
};

const renderMovie = (movie,actors) => {
  CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${
               BACKDROP_BASE_URL + movie.backdrop_path
             }>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${
              movie.release_date
            }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled"> ${actors}</ul>
            </div>`;
  
     renderActors(actors)
    
};
const renderActors = (actors) =>  {
  const actorList = document.querySelector("#actors") 
    actors.cast.slice(0, 5).map((actor) => {
    const actorDiv = document.createElement("ul");
    actorDiv.innerHTML = `
        <li>${actor.name}</li>
        <img src="${BACKDROP_BASE_URL + actor.profile_path}" alt="${actor.name} poster">`;
    actorDiv.addEventListener("click", () => {displaySingleActor();});
    actorList.appendChild(actorDiv);
  });
}
// need to add displaysingleactor function
// You'll need to play with this function in order to add features and enhance the style.

const renderActor= (actor) => {
  CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-4">
             <img id="actor-backdrop" src=${
               BACKDROP_BASE_URL + actor.profile_path
             }>
        </div>
        <div class="col-md-8">
            <h2 id="actor-name">${actor.name}</h2>
            <p id="actor-gender"> ${
              actor.gender
            }</p>
            <p id="actor-movies"><b>movies:</b> ${actor.movies}</p>
            <h3>Overview:</h3>
            <p id="actor-overview">${actor.overview}</p>
        </div>
    </div>`;
    
};

document.addEventListener("DOMContentLoaded", autorun);
