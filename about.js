const renderAbout = () => {
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
      </div> `;
    CONTAINER.appendChild(aboutDiv);
  };