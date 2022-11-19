"use strict";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
};

const constructUrl = (path) => {
  let pathSplit = path.split("?");
  let arr = [];
  if (pathSplit.length > 1) {
    arr = pathSplit[1].split("&");
  }
  let param = "";
  arr.forEach((x, i) => {
    if (i === 0) {
      param += "&";
    }
    param += x;
  });
  return `${TMDB_BASE_URL}/${pathSplit[0]}?api_key=${
    atob("NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=") + param
  }`;
};
// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  renderMovie(movieRes);
};

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

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  CONTAINER.innerHTML = `<div class="row" id="bigCardContainer"></div>`;
  movies.forEach((movie, i) => {
    let genres = "";
    movie.genre_ids.forEach((genre) => {
      genres += `${genre},`;
    });

    const movieDiv = document.createElement("div");
    movieDiv.setAttribute("data-categories", genres);
    movieDiv.setAttribute("class", "col-12 col-md-6 col-lg-4 ");
    let pathImg = BACKDROP_BASE_URL + movie.backdrop_path;
    if (movie.backdrop_path === null) {
      pathImg = "./no-img.jpg";
    }
    movieDiv.innerHTML = `
    <div class="single-card card mt-1 mb-1" "key="${i}">
      <img class="card-img-top" src="${pathImg}" alt="${movie.title} poster">
      <div class="card-body text-center" >
        <h4 class="card-title">VOTE AVERAGE ${movie.vote_average}  </h4>
        <p class="card-text">${movie.title}</p>
      </div>
    </div>
    `;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    const bigCard = document.getElementById("bigCardContainer");
    bigCard.appendChild(movieDiv);
  });
};

const direc = async (id) => {
  const url = constructUrl(`movie/${id}/credits`);
  const res = await fetch(url);
  const data = await res.json();
  let person = data.crew.find(
    (person) => person.known_for_department === "Directing"
  );
  return person;
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = async (movie) => {
  let director = await direc(movie.id);
  let pathImg = BACKDROP_BASE_URL + movie.backdrop_path;
  if (movie.backdrop_path === null) {
    pathImg = "./no-img.jpg";
  }
  CONTAINER.innerHTML = `
    <div class="row container-sm justify-content-center">
        
        <div class="col-md-8 ">
          <img class= "img-fluid rounded " src=${pathImg}>
        </div>
        <div class="col-md-4">
          <h2 >${movie.title}</h2>
          <p><b>Release Date:</b> ${movie.release_date}</p>
          <p><b>Runtime:</b> ${movie.runtime} Minutes</p>
          <h2>Director:</h2>
            <p>${director}</p>
          <h3>Overview:</h3>
          <p>${movie.overview}</p>
        </div>
        </div>
        
          <h3>Actors:</h3>
          <div id="actors" class="row"></div>
          <h3>Related movies:</h3>
          <div class="similar-movies row" id="similar"></div>
    </div>`;
  castObj(movie.id);
  movieObj(movie.id);
};
const castObj = async (id) => {
  const url = constructUrl(`movie/${id}/credits`);
  const res = await fetch(url);
  const data = await res.json();
  let cast = data.cast;
  const actorUl = document.getElementById("actors");
  let personImg = "./no-img-person.png";
  for (let i = 0; i < 5; i++) {
    if (cast[i].profile_path !== null)
      personImg = PROFILE_BASE_URL + cast[i].profile_path;

    const actorsLi = document.createElement("div");
    actorsLi.innerHTML = `
      <img src="${personImg}" alt="${cast[i].title} poster  ">
      <div class=" text-center">
        <h5>${cast[i].name}</h5>
        <span> popularity: ${cast[i].popularity}/10</span>
      </div>
    `;
    actorsLi.classList.add("col-md-5", "col-lg-2", "card", "m-2", "p-0");
    actorsLi.classList.add("single-card");
    actorUl.appendChild(actorsLi);
    actorsLi.addEventListener("click", () => {
      actorDetails(cast[i].id);
    });
  }
};
const movieObj = async (id) => {
  const url = constructUrl(`movie/${id}/similar`);
  const res = await fetch(url);
  const data = await res.json();
  let moviesObj = data.results;
  const similarMovie = document.getElementById("similar");
  let personImg = "./no-img.jpg";
  for (let i = 0; i < 5; i++) {
    if (moviesObj[i].backdrop_path !== null)
      personImg = BACKDROP_BASE_URL + moviesObj[i].backdrop_path;
    const movieSug = document.createElement("div");
    movieSug.innerHTML = `
      <img src="${personImg}" alt="${moviesObj[i].title} poster  ">
      <div class=" text-center">
        <h5>${moviesObj[i].title}</h5>
        <span> popularity: ${moviesObj[i].popularity}/10</span>
      </div>
    `;
    movieSug.classList.add("col-md-5", "col-lg-2", "card", "m-2", "p-0");
    movieSug.classList.add("single-card");
    similarMovie.appendChild(movieSug);
    movieSug.addEventListener("click", () => {
      movieDetails(moviesObj[i]);
    });
  }
};
document.addEventListener("DOMContentLoaded", autorun);
