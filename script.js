"use strict";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");
const cardRow = document.querySelector(".row");

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  //renderMovies(movies.results);

  const moviesByGenre = await fetchMoviesByGenre();

  let films = movies.results.concat(moviesByGenre.results);
  renderMovies(films);
  /*
  console.log(moviesByGenre.results);
  */
};

// Don't touch this function please
const constructUrl = (path) => {
  let daa = path.split("?");
  let ddd = [];
  if (daa.length > 1) {
    ddd = daa[1].split("&");
  }
  let param = "";
  ddd.forEach((x, i) => {
    if (i == 0) {
      param += "&";
    }
    param += x;
  });
  return `${TMDB_BASE_URL}/${daa[0]}?api_key=${
    atob("NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=") + param
  }`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);

  renderMovie(movieRes);
};
const actorDetails = async (actor) => {
  const actorRes = await fetchMovie(actor.id);

  renderActors(actorRes);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`/movie/popular`);
  const res = await fetch(url);
  return res.json();
};

const fetchMoviesByGenre = async (genreId) => {
  const url = constructUrl(`discover/movie?with_genres=${genreId}`);
  console.log(url);
  const res = await fetch(url);
  return res.json();
};
const fetchActors = async () => {
  const url = constructUrl(`person/popular`);
  //console.log(url);
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
  cardRow.innerHTML = "";
  movies.forEach((movie, i) => {
    //console.log(movie);
    let genres = "";
    movie.genre_ids.forEach((genre) => {
      genres += `${genre},`;
    });

    const movieDiv = document.createElement("div");
    movieDiv.setAttribute("data-categories", genres);
    movieDiv.innerHTML = `
  <div key="${i}">
      <div class="card " >
      <div class="card-body">
      <img class="card-img-top" src="${
        BACKDROP_BASE_URL + movie.backdrop_path
      }" alt="${movie.title} poster">
      <h4 class="card-title">vote average ${movie.vote_average}  </h4>
      <p class="card-text">${movie.title}</p>
      <a href="#" class="btn btn-primary">See Profile</a>

    </div>
    </div>
    </div>

          `;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    cardRow.appendChild(movieDiv);
  });
};

const renderActors = async (actorsResults) => {
  console.log(actorsResults);
  const actorDiv = document.createElement("div");
  actorsResults.forEach((actor) => {
    actorDiv.innerHTML += `
  <div >
      <div class="card " >
      <div class="card-body">
      <img class="card-img-top" src="${
        BACKDROP_BASE_URL + actor.profile_path
      }" alt="${actor.name} poster">
      <h4 class="card-title">vote average ${actor.popularity}  </h4>
      <p class="card-text">${actor.known_for_department}</p>
      <a href="#" class="btn btn-primary">See Profile</a>

    </div>
    </div>
    </div>

          `;

    //console.log(actorDiv);
    actorDiv.addEventListener("click", () => {
      actorDetails(actor);
    });
    cardRow.appendChild(actorDiv);
  });
  return actorDiv;
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie) => {
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
            <ul id="actors" class="list-unstyled"></ul>
    </div>`;
};

const actorsList = async () => {
  const actors = await fetchActors();
  const actorsResults = await renderActors(actors.results);
  // renderActors(actorsResults);
  console.log(actorsResults);
  cardRow.innerHTML = "";
  cardRow.appendChild(actorsResults);
};

document.addEventListener("DOMContentLoaded", autorun);

window.addEventListener("load", () => {
  const dropItems = document.querySelectorAll(".dropdown-item");

  // const categories = (categoryId) => {
  //   let result;
  //   cardRow.childNodes.forEach((a) => {
  //     a.dataset.categories.split(",").forEach((item) => {
  //       if (item !== "") {
  //         if (item == categoryId) {
  //           result = item;
  //         }
  //       }
  //     });
  //   });
  //   return result;
  // };

  // const displayMove = (categoryId) => {
  //   cardRow.childNodes.forEach((item) => {
  //     const category = item.dataset.categories.search(categoryId);
  //     item.style.display = "block";
  //     if (category === -1) {
  //       // console.log(a[i])
  //       item.style.display = "none";
  //     }
  //   });
  // };

  dropItems.forEach((dropItem) => {
    dropItem.addEventListener("click", async () => {
      const moviesByGenre = await fetchMoviesByGenre(dropItem.dataset.category);
      console.log(moviesByGenre);

      // let films = movies.results.concat(moviesByGenre.results);
      renderMovies(moviesByGenre.results);
      // console.log(displayMove(categories(dropItem.dataset.category)));
    });
  });
});
