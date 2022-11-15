"use strict";

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.

const fetchMoviesByGenre = async (genreId) => {
  const url = constructUrl(`discover/movie?with_genres=${genreId}`);
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.

// You'll need to play with this function in order to add features and enhance the style.
const renderMoviesGen = (movies) => {
  CONTAINER.innerHTML = "";
  movies.forEach((movie, i) => {
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
    CONTAINER.appendChild(movieDiv);
  });
};

// You'll need to play with this function in order to add features and enhance the style.

window.addEventListener("load", () => {
  const dropItems = document.querySelectorAll("dropdown-menu-genres-item");
  console.log(dropItems);
  dropItems.forEach((dropItem) => {
    dropItem.addEventListener("click", async () => {
      const moviesByGenre = await fetchMoviesByGenre(dropItem.dataset.category);
      console.log(moviesByGenre);

      renderMoviesGen(moviesByGenre.results);
    });
  });
});
