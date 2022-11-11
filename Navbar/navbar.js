const NAV = document.querySelector(".navbar");

const searchFunc = () => {
  return;
};

// const widthOutput = document.querySelector("#nav-bar");
// let width = window.innerWidth;
// function resizeListener() {
//   width = window.innerWidth;
//   renderNav();
//   return width;
// }
// window.addEventListener("resize", resizeListener);
// menuFunc = () => {

// };
const burgerMenu = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".left-nav");
  const elements = document.querySelectorAll(".navbar-element");
  const elementsArr = [...elements];
  console.log(elementsArr);

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
      
      <ul class="left-nav">
        <li class="navbar-element" id="HOME">HOME</li>
        <li class="navbar-element" id="Actors">Actors</li>
        <li class="navbar-element" id="Genres">Genres</li>
        <li class="navbar-element" id="Filter">Filter</li>
        <li class="navbar-element" id="About">About</li>
      </ul>
      

      <div class="burger">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>

      <div class="logo id="logo">logo</div>
          
      <div class="search-nav">
        <input type="text" id="myInput" onkeyup="${searchFunc()}" placeholder="Search for names..">
      </div>

    </div>`;
  burgerMenu();
};

renderNav();
