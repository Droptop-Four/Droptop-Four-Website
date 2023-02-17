const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

let search_query = params.s

const selezionati = [];

const search_bar = document.getElementById('searchbar');

(async () => {
    const apps_url = 'https://raw.githubusercontent.com/Droptop-Four/GlobalData/main/data/community_apps/community_apps.json';
    const themes_url = 'https://raw.githubusercontent.com/Droptop-Four/GlobalData/main/data/community_themes/community_themes.json';

    const apps_response = await fetch(apps_url);
    const themes_response = await fetch(themes_url);
    const apps_json = await apps_response.json();
    const themes_json = await themes_response.json();

    const apps_items = apps_json.apps;
    const themes_items = themes_json.themes;

    if (search_query) {
        let search_query = params.s.toLowerCase();

        search_bar.value = search_query;

        for (let i in apps_items) {
            const app = apps_items[i].app;
            if (app.hidden != 1) {
                if (app.name.toLowerCase().includes(search_query) || app.author.toLowerCase().includes(search_query) || app.desc.toLowerCase().includes(search_query)) {
                    selezionati.push(apps_items[i]);
                }
            }
        }

        for (let i in themes_items) {
            const theme = themes_items[i].theme;
            if (theme.hidden != 1) {
                if (theme.name.toLowerCase().includes(search_query) || theme.author.toLowerCase().includes(search_query) || theme.desc.toLowerCase().includes(search_query)) {
                    selezionati.push(themes_items[i]);
                }
            }
        }
    }

    const searchList = document.getElementById('searchList');

    let result = '';

    for (let i in selezionati) {
        let item = selezionati[i];

        if (item.app) {
            let selected_app = item.app;

            if (selected_app.author_link == '') {
                if (selected_app.official_link == '') {
                    result += `
        <div>
          <div class="app-card" id="${selected_app.id}">
            <div class="app-card-container">
              <img class="app-card-image" src="${selected_app.image_url}" alt="${selected_app.name} image">
              <h3 class="app-card-name">${selected_app.name}</h3>
              <p class="app-card-version">v${selected_app.version}</p>
              <p class="app-card-author">Created by <a class="app-card-author-link">${selected_app.author}</a></p>
              <p class="app-card-desc">${selected_app.desc}</p>
              <div class="app-card-buttons">
                  <a class="app-card-button bold" href="${selected_app.direct_download_link}">Download</a>
              </div>
            </div>  
          </div>
        </div>
        `;
                } else {
                    result += `
        <div>
          <div class="app-card" id="${selected_app.id}">
            <div class="app-card-container">
              <img class="app-card-image" src="${selected_app.image_url}" alt="${selected_app.name} image">
              <h3 class="app-card-name">${selected_app.name}</h3>
              <p class="app-card-version">v${selected_app.version}</p>
              <p class="app-card-author">Created by <a class="app-card-author-link">${selected_app.author}</a></p>
              <p class="app-card-desc">${selected_app.desc}</p>
              <div class="app-card-buttons">
                  <a class="app-card-button bold" href="${selected_app.direct_download_link}">Download</a>
                  <a class="app-card-button" href="${selected_app.official_link}" target="_blank">See on Github</a>
              </div>
            </div>  
          </div>
        </div>
        `;
                }
            } else {
                if (selected_app.official_link == '') {
                    result += `
        <div>
          <div class="app-card" id="${selected_app.id}">
            <div class="app-card-container">
              <img class="app-card-image" src="${selected_app.image_url}" alt="${selected_app.name} image">
              <h3 class="app-card-name">${selected_app.name}</h3>
              <p class="app-card-version">v${selected_app.version}</p>
              <p class="app-card-author">Created by <a class="app-card-author-link">${selected_app.author}</a></p>
              <p class="app-card-desc">${selected_app.desc}</p>
              <div class="app-card-buttons">
                  <a class="app-card-button bold" href="${selected_app.direct_download_link}">Download</a>
              </div>
            </div>  
          </div>
        </div>
        `;
                } else {
                    result += `
        <div>
          <div class="app-card" id="${selected_app.id}">
            <div class="app-card-container">
              <img class="app-card-image" src="${selected_app.image_url}" alt="${selected_app.name} image">
              <h3 class="app-card-name">${selected_app.name}</h3>
              <p class="app-card-version">v${selected_app.version}</p>
              <p class="app-card-author">Created by <a class="app-card-author-link">${selected_app.author}</a></p>
              <p class="app-card-desc">${selected_app.desc}</p>
              <div class="app-card-buttons">
                  <a class="app-card-button bold" href="${selected_app.direct_download_link}">Download</a>
                  <a class="app-card-button" href="${selected_app.official_link}" target="_blank">See on Github</a>
              </div>
            </div>  
          </div>
        </div>
        `;
                }
            }
        } else {
            let selected_theme = item.theme;

            if (selected_theme.author_link == '') {
                result += `
      <div>
        <div class="theme-card" id="${selected_theme.id}">
          <div class="theme-card-container">
            <img class="theme-card-image" src="${selected_theme.image_url}" alt="${selected_theme.name} image">
            <h3 class="theme-card-name">${selected_theme.name}</h3>
            <p class="theme-card-author">Created by <a class="theme-card-author-link">${selected_theme.author}</a></p>
            <p class="theme-card-desc">${selected_theme.desc}</p>
            <div class="theme-card-buttons">
                <a class="theme-card-button bold" href="${selected_theme.direct_download_link}">Download</a>
            </div>
          </div>  
        </div>
      </div>
      `;
            } else {
                result += `
      <div>
        <div class="theme-card" id="${selected_theme.id}">
          <div class="theme-card-container">
            <img class="theme-card-image" src="${selected_theme.image_url}" alt="${selected_theme.name} image">
            <h3 class="theme-card-name">${selected_theme.name}</h3>
            <p class="theme-card-author">Created by <a class="theme-card-author-link" href="${selected_theme.author_link}">${selected_theme.author}</a></p>
            <p class="theme-card-desc">${selected_theme.desc}</p>
            <div class="theme-card-buttons">
                <a class="theme-card-button bold" href="${selected_theme.direct_download_link}">Download</a>
            </div>
          </div>  
        </div>
      </div>
      `;
            }
        }
    }

    searchList.innerHTML = result;
})();
