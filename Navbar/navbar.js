const NAV = document.querySelector(".navbar");

const burgerMenu = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".left-nav");
  const elements = document.querySelectorAll(".navbar-element");
  const elementsArr = [...elements];

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    elementsArr.map((element) => {
      element.classList.toggle("navbar-element-active");
    });
  });
};
const renderNav = () => {
  NAV.innerHTML = `
  <div class="navbar-div">

  <div class="navbar-logo-burger">
  <div class="logo id="logo">logo</div>
  <div class="burger">
  <div class="line1"></div>
  <div class="line2"></div>
  <div class="line3"></div>
  </div>
  </div>

  <ul class="left-nav">
  <li class="navbar-element" ><a href="#" id="HOME">HOME</a></li>
  <li class="navbar-element" ><a href="#" id="Actors">Actors</a></li>
  <div class="dropdown-left-nav navbar-element">
    <button class="navbar--btn" >Genres</button>
    <ul class="navbar-element-multi" id="Genres" ></ul>
  </div>
  <div class="dropdown-left-nav navbar-element">
    <button class="navbar--btn">Filter</button>
    <ul class="navbar-element-multi" id="Filter">
    <li><a class="dropdown-menu-filter-item" id="popular" href="#">Popular</a></li>
    <li><a class="dropdown-menu-filter-item" id="relase-date" href="#">Latest relase</a></li>
    <li><a class="dropdown-menu-filter-item" id="top-rated" href="#">Top rated</a></li>
    <li><a class="dropdown-menu-filter-item" id="now-playing" href="#">Now playing</a></li>
    <li><a class="dropdown-menu-filter-item" id="up-coming" href="#">Up coming</a></li>
    </ul>
  </div>
  <li class="navbar-element" "><a href="#" id="About">About</a></li>
  </ul>

  <form class="src-form " id="srcFrm">
  <input class="src-input" id="src" type="search" placeholder="SEARCH">
  <button class="btn-form" type="submit">Search</button>
  </form>

  </div>
  `;
  burgerMenu();
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
