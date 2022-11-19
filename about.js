const renderAbout = () => {
  CONTAINER.innerHTML = "";
  const aboutDiv = document.createElement("div");
  aboutDiv.innerHTML = `
    <div class="about">
            <h3>Welcome to HDfilmcehennemi  </h3>
            <p>If you've come this far, you know what this site is about.</p>
            <h3>Brought to you by:</h3>
            <div class="flexGitHubNames">
                <div>
                    <p class="h3">Furkan Ataş: <a target="_blank" href="https://github.com/LittleLebowski" class ="badge badge-info">Github</a></p>
                </div>
                <div>
                    <p class="h3">Seda Ünal: <a target="_blank" href="https://github.com/justsedaunal" class ="badge badge-info">Github</a></p>
                </div>
                <div>
                <p class="h3">Sara Sallat: <a target="_blank" href="https://github.com/sara-sallat" class ="badge badge-info">Github</a></p>
            </div>
            <div>
            <p class="h3">Çağla Bircan: <a target="_blank" href="https://github.com/caglabircan" class ="badge badge-info">Github</a></p>
        </div>
            </div>
        </div>`;
  CONTAINER.appendChild(aboutDiv);
};
