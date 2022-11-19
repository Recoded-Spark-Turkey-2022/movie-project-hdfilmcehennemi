const fetchActors = async () => {
  const url = constructUrl(`person/popular`);
  const res = await fetch(url);
  return res.json();
};
const actorsList = async () => {
  const actors = await fetchActors();
  const actorsResults = await renderActors(actors.results);
};

const renderActors = async (actorsResults) => {
  CONTAINER.innerHTML = `<div class="row" id="bigCardContainer"></div>`;
  actorsResults.forEach((actor, index) => {
    const actorDiv = document.createElement("div");
    actorDiv.setAttribute("class", "col-12 col-md-6 col-lg-4 ");
    actorDiv.innerHTML += `
      <div class="single-card card mt-1 mb-1" >
        <img class="card-img-top" src="${
          BACKDROP_BASE_URL + actor.profile_path
        }" alt="${actor.name} poster">
        <div class="card-body text-center" >
          <h4 class="card-title">VOTE AVERAGE ${actor.popularity}  </h4>
          <p class="card-text">${actor.name}</p>
        </div>
      </div>
            `;

    actorDiv.addEventListener("click", () => {
      actorDetails(actor.id);
    });

    const bigCard = document.getElementById("bigCardContainer");
    bigCard.appendChild(actorDiv);
  });
};

const actorDetails = async (actor) => {
  const actorRes = await fetchActor(actor);
  renderActor(actorRes);
};
const fetchActor = async (id) => {
  const url = constructUrl(`person/${id}`);
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const renderActor = async (actor) => {
  CONTAINER.innerHTML = "";
  CONTAINER.innerHTML = `
   <div class="row">
          <div class="col-lg-4 col-md-12 col-sm-12">
            <img src=${PROFILE_BASE_URL + actor.profile_path}> 
          </div>
          <div class="col-lg-8 col-md-12 col-sm-12">
            <h2 ><span>${actor.name}</span></h2>
            <h4>Gender:</h4>
            <p >${actor.gender == 1 ? "famale" : "male"}</p>
            <h4>Popularity:</h4>
            <p >${actor.popularity}</p>
            <h4>Birthday:</h4>
            <p id="birthday">${actor.birthday}</p>
            <h4 id="deathH">Deathday:</h4>
            <p id="death">${actor.deathday}</p>
            
            <h4>Biography:</h4>
             <p style="color:#9DA0A2; font-size: 1rem;">${actor.biography}</p>
          </div>
          <div class="container mt-5" >
            <h4 style="padding:1rem;"> Related Movies:</h4> 
            <div id="related-movies"class="row justify-content-center"></div>
          </div>
        </div>  
      `;

  if (actor.deathday === null) {
    document.getElementById("death").remove();
    document.getElementById("deathH").remove();
  }
  movieRelated(actor.id);
};

const movieRelated = async (id) => {
  const url = constructUrl(`person/${id}/movie_credits`);
  const res = await fetch(url);
  const data = await res.json();
  const objCast = data.cast;
  const related = document.getElementById("related-movies");
  for (let i = 0; i < 5; i++) {
    let imagePath = "/no_img-person.jpg";
    if (objCast[i].backdrop_path !== null) {
      imagePath = BACKDROP_BASE_URL + objCast[i].backdrop_path;
      const singleCar = document.createElement("div");
      singleCar.innerHTML = `
            <img src="${imagePath}" alt="${objCast[i].title} poster  ">
            <div class=" text-center">
                <h5>${objCast[i].title}</h5>
                <span> ratings: ${objCast[i].vote_average}/10</span>
            </div>`;
      singleCar.classList.add("col-md-5", "col-lg-2", "card", "m-2", "p-0");
      singleCar.classList.add("single-card");
      related.appendChild(singleCar);

      singleCar.addEventListener("click", () => {
        movieDetails(objCast[i]);
      });
    }
  }
};
