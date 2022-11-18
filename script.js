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

// Don't touch this function please
// const constructUrl = (path) => {
//   return `${TMDB_BASE_URL}/${path}?api_key=${atob(
//     "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
//   )}`;
// };
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
  const Actors = await fetchActors(movie.id);
  const related = await fetchRelatedMovies(movie.id);
  const trailer = await fetchTrailer(movie.id);
  

  renderMovie(movieRes, Actors);
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

const fetchMoviesByGenre = async (genreId) => {
  const url = constructUrl(`discover/movie?with_genres=${genreId}`);
  console.log(url);
  const res = await fetch(url);
  return res.json();
};

// fetch related movies
const fetchRelatedMovies = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/similar`);
  const res = await fetch(url);
  return res.json();
};
//fetch the actors :
const fetchActors = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/credits`);
  const res = await fetch(url);
  return res.json();
};
//fetch trailer:
const fetchTrailer = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/videos`);
  const res = await fetch(url);
  return res.json();
};
const fetchActor = async (person_id) => {
  const url = constructUrl(`person/${person_id}/movie_credits`);
  const res = await fetch(url);
  return res.json();
};


// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  CONTAINER.innerHTML = "";
  const movieDiv = document.createElement("div");
  movieDiv.classList.add("moviediv");
  movies.forEach((movie, i) => {
    let genres = "";
    movie.genre_ids.forEach((genre) => {
      genres += `${genre},`;
    });

   const movie_div= document.createElement("div");
    movie_div.setAttribute("data-categories", genres);
    movie_div.innerHTML = `
      <div key="${i}">
      <div class="card " >
      <div class="card-body">
      <img class="card-img-top" src="${
        BACKDROP_BASE_URL + movie.backdrop_path
      }" alt="${movie.title} poster">
      <h3 class="card-text">${movie.title}</h3>
      <p class="card-title">  ${movie.vote_average}  </p>
     
    </div>
    </div>
    </div>
          `;
          
    movie_div.addEventListener("click", () => {
      movieDetails(movie);
    });
    movieDiv.appendChild(movie_div);
    CONTAINER.appendChild(movieDiv);
  });
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie,actors) => {
  const arrayOfAcrtors = [];

  if (actors.cast.length != 0) {
    for (let i = 0; i <= 4; i++) {
      if (actors.cast[i]) arrayOfAcrtors.push(` ${actors.cast[i].name}`);
    }
  }
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
            <p id="movie-director"> </p>
            <p id="movie-vote-average">Rating: ${movie.vote_average}</p>
            <p id="movie-vote-count">Vote count: ${movie.vote_count}</p>
            <p id="movie-language">Language: ${movie.original_language.toUpperCase()}</p>
        </div>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled"> ${arrayOfAcrtors}</ul>
    </div>`;
};

const renderSimilarMovies = (similar) => {
  similar.results.slice(0, 5).map((movie) => {
    const similar_div= document.createElement("div");
    similar_div.classList.add("similar_Div")
    similar_div.innerHTML = `
      <div key="${i}">
      <div class="card " >
      <div class="card-body">
      <img class="card-img-top" src="${
        BACKDROP_BASE_URL + movie.backdrop_path
      }" alt="${movie.title} poster">
      <h3 class="card-text">${movie.title}</h3>
      <p class="card-title">  ${movie.vote_average}  </p>
     
    </div>
    </div>
    </div>
          `;
          
    movie_div.addEventListener("click", () => {
      movieDetails(movie);
    });
    movieDiv.appendChild(movie_div);
    CONTAINER.appendChild(movieDiv);
  });
};
document.addEventListener("DOMContentLoaded", autorun);


window.addEventListener("load", () => {
  const dropItems = document.querySelectorAll(".dropdown-item");
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


 const renderAbout= ()=>{
  CONTAINER.innerHTML = "";
  const aboutDiv = document.createElement("div");
  aboutDiv.innerHTML = `
  <div class="welcome-message">
    <h2>Welcome</h2>
    <h3>Thank You To Choose Our Amazing Movies App>
    <i class="ghost-icon fa-solid fa-ghost"></i>
  </div>
  <div class="about-pro">
      <div class="text-container">
          <p class="mt-5 fw-bold">
            If you are bored and looking for funny, you are in the correct place. 
          </p>
          <p class="mt-1">
            This website has been created by "HDFilmCehenem " team.
          </p>
          
    </div>
  </div> ` 
  CONTAINER.appendChild(aboutDiv);    
}

const aboutBtn = document.querySelector(".about-btn");
aboutBtn.addEventListener("click", () => {
   renderAbout();
});

const filterBar = async (arg) => {
  const url = constructUrl(`movie/${arg}`);
  const res = await fetch(url);
  const data = await res.json();
  if (arg !== "latest") {
    renderMovies(data.results);
  } else {
    renderMovie(data);
  }
};

relaseDate.addEventListener("click", (e) => {
  filterBar("latest");
});

popularMovie.addEventListener("click", (e) => {
  filterBar("popular");
});

topRated.addEventListener("click", (e) => {
  filterBar("top_rated");
});

nowPlaying.addEventListener("click", (e) => {
  filterBar("now_playing");
});

upComing.addEventListener("click", (e) => {
  filterBar("upcoming");
});
