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
    <li><a class="dropdown-menu-filter-item" href="#">Popular</a></li>
    <li><a  class="dropdown-menu-filter-item" href="#">Relase date</a></li>
    <li><a i class="dropdown-menu-filter-item" href="#">Top rated</a></li>
    <li><a class="dropdown-menu-filter-item" href="#">Now playing</a></li>
    <li><a  class="dropdown-menu-filter-item" href="#">Up coming</a></li>
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
    li.setAttribute("id", i);
    li.innerHTML = genres[i]["name"];
    genersNav.appendChild(li);
    li.addEventListener("click", () => {
      genreFilter(genres[i].id);
    });
  }
};
genresList();
const genre = document.getElementById("Genres");
console.log(genre);

//search
const srcFrm = document.getElementById("srcFrm");
console.log(srcFrm);
const src = document.getElementById("src");
console.log(src);

srcFrm.addEventListener("submit", async (e) => {
  //e.preventDefault();
  const results = await searchRes(src.value);
  console.log(src.value);
  renderMovies(results);
});

const searchRes = async (value) => {
  const url = searchUrl(value);
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return data.results;
};

const searchUrl = (search) => {
  return `${TMDB_BASE_URL}/search/multi?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}&query=${search}`;
};
