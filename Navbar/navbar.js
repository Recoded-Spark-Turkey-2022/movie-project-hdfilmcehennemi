const NAV = document.querySelector(".navbar");

const renderNav = () => {
  NAV.innerHTML = `
  

<div class="container-fluid px-5 mt-3 mb-4">
  <div class="logo navbar-brand" id="logo"><img src="../Designbolts-Free-Multimedia-Film.ico" alt="icon" class="rounded-0 h-w-icon" /></div>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
<div class="collapse navbar-collapse" id="navbarScroll">

  <ul class="left-nav navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
  <li class="navbar-element nav-item" ><a class="nav-link active" aria-current="page" href="#" id="HOME">HOME</a></li>
  <li class="navbar-element nav-item" ><a class="nav-link active" aria-current="page" href="#" id="Actors">Actors</a></li>
  
  <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Genres
          </a>  
  <ul class="navbar-element-multi dropdown-menu" id="Genres" ></ul>
  </li>
  <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Filter
          </a> 
    <ul class="navbar-element-multi dropdown-menu" id="Filter">
    <li><a class="dropdown-menu-filter-item dropdown-item" id="popular" href="#">Popular</a></li>
    <li><a class="dropdown-menu-filter-item dropdown-item" id="relase-date" href="#">Latest relase</a></li>
    <li><a class="dropdown-menu-filter-item dropdown-item" id="top-rated" href="#">Top rated</a></li>
    <li><a class="dropdown-menu-filter-item dropdown-item" id="now-playing" href="#">Now playing</a></li>
    <li><a class="dropdown-menu-filter-item dropdown-item" id="up-coming" href="#">Up coming</a></li>
    </ul>
    </li>

  <li class="navbar-element" "><a class="nav-link active" aria-current="page" href="#" id="About">About</a></li>
  </ul>

  <form class="src-form d-flex" id="srcFrm" role="Search">
  <input class="src-input form-control me-2" id="src" type="search" placeholder="SEARCH">
  <button class="btn-form btn btn-outline-success" type="submit">Search</button>
  </form>
  </div>
  </div>
  
  `;
};
renderNav();
//filter items
const popularMovie = document.getElementById("popular");
const relaseDate = document.getElementById("relase-date");
const topRated = document.getElementById("top-rated");
const nowPlaying = document.getElementById("now-playing");
const upComing = document.getElementById("up-coming");

const HOME = document.getElementById("HOME");
HOME.addEventListener("click", (e) => autorun());

//genres
const genersNav = document.getElementById("Genres");

const fetchGenres = async () => {
  const url = constructUrl(`/genre/movie/list`);
  const res = await fetch(url);
  const data = await res.json();
  return data["genres"];
};

const genresList = async () => {
  const genres = await fetchGenres();
  for (let i in genres) {
    const li = document.createElement("li");
    li.classList.add("dropdown-menu-genres-item");
    li.setAttribute("id", genres[i]["id"]);
    li.setAttribute("class", "dropdown-item");
    li.innerHTML = genres[i]["name"];
    li.addEventListener("click", async () => {
      const moviesByGenre = await fetchMoviesByGenre(genres[i]["id"]);
      renderMovies(moviesByGenre.results);
    });
    genersNav.appendChild(li);
  }
};
genresList();

//search
const srcFrm = document.getElementById("srcFrm");

const src = document.getElementById("src");

srcFrm.addEventListener("submit", async (e) => {
  //e.preventDefault();
  const results = await searchRes(src.value);
  renderMovies(results);
});

const searchRes = async (value) => {
  const url = searchUrl(value);
  const res = await fetch(url);
  const data = await res.json();

  return data.results;
};

const searchUrl = (search) => {
  return `${TMDB_BASE_URL}/search/multi?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}&query=${search}`;
};
