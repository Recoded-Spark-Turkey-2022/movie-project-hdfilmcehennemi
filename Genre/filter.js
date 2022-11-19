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