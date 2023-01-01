// ---- COMMUNITY APPS ----

const appsList = document.getElementById('appsList');

class Apps {
    async Items() {
        try {
            let result = await fetch('https://raw.githubusercontent.com/Droptop-Four/GlobalData/main/data/community_apps/community_apps.json');
            let data = await result.json();

            let appsItems = data.apps;

            appsItems = appsItems.map((item) => {
                const { id, name, author, author_link, desc, version, official_link, direct_download_link, secondary_link, image_url, hidden } = item.app;

                return {
                    id,
                    name,
                    author,
                    author_link,
                    desc,
                    version,
                    official_link,
                    direct_download_link,
                    secondary_link,
                    image_url,
                    hidden,
                };
            });
            return appsItems;
        } catch (error) {
            console.log(error);
        }
    }
}

class DisplayApps {
    displayApps(apps) {
        let result = '';
        apps.forEach((item) => {
            if (item.hidden != 1) {
                if (item.author_link == '') {
                    if (item.official_link == '') {
                        result += `
            <div>
              <div class="app-card" id="${item.id}">
                <div class="app-card-container">
                  <img class="app-card-image" src="${item.image_url}" alt="${item.name} image">
                  <h3 class="app-card-name">${item.name}</h3>
                  <p class="app-card-version">v${item.version}</p>
                  <p class="app-card-author">Created by <a class="app-card-author-link">${item.author}</a></p>
                  <p class="app-card-desc">${item.desc}</p>
                  <div class="app-card-buttons">
                      <a class="app-card-button bold" href="${item.direct_download_link}">Download</a>
                  </div>
                </div>  
              </div>
            </div>
            `;
                    } else {
                        result += `
            <div>
              <div class="app-card" id="${item.id}">
                <div class="app-card-container">
                  <img class="app-card-image" src="${item.image_url}" alt="${item.name} image">
                  <h3 class="app-card-name">${item.name}</h3>
                  <p class="app-card-version">v${item.version}</p>
                  <p class="app-card-author">Created by <a class="app-card-author-link">${item.author}</a></p>
                  <p class="app-card-desc">${item.desc}</p>
                  <div class="app-card-buttons">
                      <a class="app-card-button bold" href="${item.direct_download_link}">Download</a>
                      <a class="app-card-button" href="${item.official_link}" target="_blank">See on Github</a>
                  </div>
                </div>  
              </div>
            </div>
            `;
                    }
                } else {
                    if (item.official_link == '') {
                        result += `
            <div>
              <div class="app-card" id="${item.id}">
                <div class="app-card-container">
                  <img class="app-card-image" src="${item.image_url}" alt="${item.name} image">
                  <h3 class="app-card-name">${item.name}</h3>
                  <p class="app-card-version">v${item.version}</p>
                  <p class="app-card-author">Created by <a class="app-card-author-link">${item.author}</a></p>
                  <p class="app-card-desc">${item.desc}</p>
                  <div class="app-card-buttons">
                      <a class="app-card-button bold" href="${item.direct_download_link}">Download</a>
                  </div>
                </div>  
              </div>
            </div>
            `;
                    } else {
                        result += `
            <div>
              <div class="app-card" id="${item.id}">
                <div class="app-card-container">
                  <img class="app-card-image" src="${item.image_url}" alt="${item.name} image">
                  <h3 class="app-card-name">${item.name}</h3>
                  <p class="app-card-version">v${item.version}</p>
                  <p class="app-card-author">Created by <a class="app-card-author-link">${item.author}</a></p>
                  <p class="app-card-desc">${item.desc}</p>
                  <div class="app-card-buttons">
                      <a class="app-card-button bold" href="${item.direct_download_link}">Download</a>
                      <a class="app-card-button" href="${item.official_link}" target="_blank">See on Github</a>
                  </div>
                </div>  
              </div>
            </div>
            `;
                    }
                }
            }
        });
        appsList.innerHTML = result;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const apps = new Apps();
    const displayapps = new DisplayApps();

    apps.Items().then((apps) => displayapps.displayApps(apps));
});
