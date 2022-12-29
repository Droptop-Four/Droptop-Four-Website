// ---- COMMUNITY THEMES ----

const themesList = document.getElementById("themesList");

class Themes {
  async Items() {
    try {
      let result = await fetch(
        "https://raw.githubusercontent.com/Droptop-Four/GlobalData/main/data/community_themes/community_themes.json"
      );
      let data = await result.json();

      let themesItems = data.themes;

      themesItems = themesItems.map((item) => {
        const {
          id,
          name,
          author,
          author_link,
          desc,
          official_link,
          direct_download_link,
          secondary_link,
          image_url,
          hidden,
        } = item.theme;

        return {
          id,
          name,
          author,
          author_link,
          desc,
          official_link,
          direct_download_link,
          secondary_link,
          image_url,
          hidden,
        };
      });
      return themesItems;
    } catch (error) {
      console.log(error);
    }
  }
}

class DisplayThemes {
  displayThemes(themes) {
    let result = "";
    themes.forEach((item) => {
      if (item.hidden != 1) {
        if (item.author_link == "") {
          result += `
          <div>
            <div class="theme-card" id="${item.id}">
              <div class="theme-card-container">
                <img class="theme-card-image" src="${item.image_url}" alt="${item.name} image">
                <h3 class="theme-card-name">${item.name}</h3>
                <p class="theme-card-author">Created by <a class="theme-card-author-link">${item.author}</a></p>
                <p class="theme-card-desc">${item.desc}</p>
                <div class="theme-card-buttons">
                    <a class="theme-card-button bold" href="${item.direct_download_link}">Download</a>
                </div>
              </div>  
            </div>
          </div>
          `;
        } else {
          result += `
          <div>
            <div class="theme-card" id="${item.id}">
              <div class="theme-card-container">
                <img class="theme-card-image" src="${item.image_url}" alt="${item.name} image">
                <h3 class="theme-card-name">${item.name}</h3>
                <p class="theme-card-author">Created by <a class="theme-card-author-link" href="${item.author_link}">${item.author}</a></p>
                <p class="theme-card-desc">${item.desc}</p>
                <div class="theme-card-buttons">
                    <a class="theme-card-button bold" href="${item.direct_download_link}">Download</a>
                </div>
              </div>  
            </div>
          </div>
          `;
        }
      }
    });
    themesList.innerHTML = result;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const themes = new Themes();
  const displaythemes = new DisplayThemes();

  themes.Items().then((themes) => displaythemes.displayThemes(themes));
});
