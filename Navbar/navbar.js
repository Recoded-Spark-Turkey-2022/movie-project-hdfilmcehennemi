const NAV = document.querySelector(".navbar");

// search movie

const searchFunc = () => {
  return;
};

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
    <li><a id="popularmovies" class="dropdown-menu-filter-item" href="#">Popular</a></li>
    <li><a id="relasedatemovies" class="dropdown-menu-filter-item" href="#">Relase date</a></li>
    <li><a id="topratedmovies" class="dropdown-menu-filter-item" href="#">Top rated</a></li>
    <li><a id="nowplayingmovies" class="dropdown-menu-filter-item" href="#">Now playing</a></li>
    <li><a id="upcomingmovies" class="dropdown-menu-filter-item" href="#">Up coming</a></li>
    </ul>
  </div>
  <li class="navbar-element" "><a href="#" id="About">About</a></li>
  </ul>

  <form class="d-flex text-dark " id="searchForm" role="search">
  <input class="form-control me-2 rounded-pill " id="search" type="search" placeholder="I'm looking for.." aria-label="Search">
  <button class="btn btn-outline-primary btn-light rounded-pill" type="submit">Search</button>
  </form>

  </div>
  `;
  burgerMenu();
};

renderNav();
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
    li.innerHTML = genres[i]["name"];
    genersNav.appendChild(li);
    // on click event for each list item fetch the movies for that genre
    li.addEventListener("click", () => {
      genreFilter(genres[i].id);
    });
  }
};
genresList();
const genre = document.getElementById("Genres");
console.log(genre);

//search
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("search");

// search on submit

searchForm.addEventListener("submit", async (e) => {
  //e.preventDefault();
  const results = await searchRes(searchInput.value);
  console.log(searchInput.value);
  renderMovies(results);
});
const searchUrl = (search) => {
  return `${TMDB_BASE_URL}/search/multi?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}&query=${search}`;
};

//fetch results

const searchRes = async (value) => {
  const url = searchUrl(value);
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return data.results;
};
